/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getSampleData = `query GetSampleData($id: ID!) {
  getSampleData(id: $id) {
    id
    group
    terminalName
    publishedAt
    count
  }
}
`;
export const listSampleData = `query ListSampleData(
  $filter: TableSampleDataFilterInput
  $limit: Int
  $nextToken: String
) {
  listSampleData(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      group
      terminalName
      publishedAt
      count
    }
    nextToken
  }
}
`;
