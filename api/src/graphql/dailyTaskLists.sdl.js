export const schema = gql`
  type DailyTaskList {
    id: Int!
    userId: Int!
    listDate: DateTime!
    taskList: String!
    User: User!
  }

  type Query {
    dailyTaskLists: [DailyTaskList!]! @requireAuth
    dailyTaskList(id: Int!): DailyTaskList @requireAuth
  }

  input CreateDailyTaskListInput {
    userId: Int!
    listDate: DateTime!
    taskList: String!
  }

  input UpdateDailyTaskListInput {
    userId: Int
    listDate: DateTime
    taskList: String
  }

  type Mutation {
    createDailyTaskList(input: CreateDailyTaskListInput!): DailyTaskList!
      @requireAuth
    updateDailyTaskList(
      id: Int!
      input: UpdateDailyTaskListInput!
    ): DailyTaskList! @requireAuth
    deleteDailyTaskList(id: Int!): DailyTaskList! @requireAuth
  }
`
