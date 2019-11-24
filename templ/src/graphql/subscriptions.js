/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateSampleData = `subscription OnCreateSampleData($group: String) {
  onCreateSampleData(group: $group) {
    id
    group
    terminalName
    publishedAt
    count
  }
}
`;
export const onUpdateSampleData = `subscription OnUpdateSampleData($group: String) {
  onUpdateSampleData(group: $group) {
    id
    group
    terminalName
    publishedAt
    count
  }
}
`;
export const onDeleteSampleData = `subscription OnDeleteSampleData(
  $id: ID
  $group: String
  $terminalName: String
  $publishedAt: AWSDateTime
  $count: Int
) {
  onDeleteSampleData(
    id: $id
    group: $group
    terminalName: $terminalName
    publishedAt: $publishedAt
    count: $count
  ) {
    id
    group
    terminalName
    publishedAt
    count
  }
}
`;
