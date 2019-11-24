# Pre Requirement

※動かすだけなら不要

```
npm inarll -g @aws-amplify/cli
cd templ
amplify init
amplify add codegen [AppSync の ID]
```

templ/src したのファイルを /src にコピー

# setup

```
yarn install
```

# Run

```
yarn start
```

# How to use
- ブラウザを複数立ち上げる。
- 全部の開発者ツールでコンソールを立ち上げる
- 画面左上上部の二つ目「Browser XX」となっている値をブラウザごとに変える。
- どれか一つのpublishボタンを押してみる
  - エラーが出た場合は、画面左上の「Group N」の数字を 2 - 9999 の間で変えてみる。
  - publishボタンを押してないブラウザの画面左上の「Group N」もうまくいった値にかえる
- publishボタンを押してないブラウザのsubscribeを押す
- コンソールでサブスクライブされていることが確認できる
