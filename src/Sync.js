import React, { useState } from 'react';
import Amplify, {API, graphqlOperation} from 'aws-amplify';
import awsconfig from './aws-exports';
import * as mutations from './graphql/mutations';
import * as subscriptions from './graphql/subscriptions';
import * as queries from './graphql/queries';

import format from 'date-fns/format';

Amplify.configure(awsconfig);

export default function Sync() {
    const [groupName, setGroupName] = useState("Group 3");
    const [terminalName, setTerminalName] = useState("Browser 1");
    const [actionInterval, setActionInterval] = useState(5000);
    const [count, setCount] = useState(10);

    let intervalId;

    const stop = function() {
        if(intervalId) clearInterval(intervalId);
        
        intervalId = 0;
    }

    const publish = () => {
        console.log("%cStart publish", "color: #009900;");
        stop();
        let current = 0;
        const action = function(source){
            current++;
            const publishedAt = new Date();
            console.log(`%c  update ${current} ${publishedAt}`, "color: #009900;")
            API.graphql(graphqlOperation(mutations.updateSampleData, {
                input: {
                    id: source.id,
                    publishedAt: publishedAt
                }
            })).then(result => console.log(`%c    update completed ${result.data.updateSampleData.publishedAt}`, "color: #009900;"));
            if(source.count <= current) {
                console.log("%cComplete publish", "color: #009900;");
                stop();
            }
        };

        API.graphql(graphqlOperation(queries.listSampleData, {
            filter: {
                group: {eq: groupName}
            },
            limit: 1000
        })).then(res => {
            const items = res.data.listSampleData.items;
            if(!items.length) {
                console.log(`Group not found. ${groupName}`);
                return;
            }
            const data = items[0];
            console.log(`%cGet target: ${data.id} ${data.group}`, "color: #009900;");
            setGroupName(data.group);
            intervalId = setInterval(action.bind(this, data), actionInterval);
        });
    };

    let subscribeCreated;
    let subscribeUpdated;

    const formatDate = (value) => {
        const date = new Date(value);
        return format(date, "HH:mm:ss.T");
    };

    const unsubscribe = () => {
        if(subscribeCreated && subscribeCreated.unsubscribe) {
            subscribeCreated.unsubscribe();
            console.log("%cUnsubscribe create", "color: #0000CC;");
        }
        if(subscribeUpdated && subscribeUpdated.unsubscribe) {
            subscribeUpdated.unsubscribe();
            console.log("%cUnsubscribe update", "color: #0000CC;");
        }
    }

    const subscribe = () => {
        unsubscribe();
        subscribeCreated = API.graphql(
            graphqlOperation(subscriptions.onCreateSampleData, {
                group: groupName
            })
        ).subscribe({
            next: (data) => {
                console.log(`%c  Receive created at: ${formatDate(new Date())}, publishedAt: ${formatDate(new Date(data.value.data.onCreateSampleData.publishedAt))}`, "color: #0000CC;");
            },
            error: (err) => {
                console.log(`%c  Receive created error ${JSON.stringify(err)}`, "color: #990000;");
            }, 
            close: () => {
                console.log(`%c  Receive created closed`);
            }
        });
        subscribeUpdated = API.graphql(
            graphqlOperation(subscriptions.onUpdateSampleData, {
                group: groupName
            })
        ).subscribe({
            next: (data) => {
                console.log(`%c  Receive updated at: ${formatDate(new Date())}, publishedAt: ${formatDate(new Date(data.value.data.onUpdateSampleData.publishedAt))}`, "color: #0000CC;");
            },
            error: (err) => {
                console.log(`%c  Receive updated error ${JSON.stringify(err)}`, "color: #990000;");
            }, 
            close: () => {
                console.log(`%c  Receive updated close`);
            }
        });

        console.log(`%cSubscribe to group: ${groupName}`, "color: #0000CC;");
    };

    return (
        <div>
            <input value={groupName} onChange={(e) => setGroupName(e.target.value)} placeholder="Group" />
            <input value={terminalName} onChange={(e) => setTerminalName(e.target.value)} placeholder="Terminal Name" />
            <div>
                <input value={actionInterval} onChange={(e) => setActionInterval(Number.parseInt(e.target.value))} placeholder="Interval" />
                <input value={count} onChange={(e) => setCount(Number.parseInt(e.target.value))} placeholder="Count" />
                <button onClick={() => publish()}>Publish</button>
            </div>
            <div>
                <button onClick={() => subscribe()}>Subscribe</button>
                <button onClick={() => unsubscribe()}>Unubscribe</button>
            </div>
        </div>
    )
};

