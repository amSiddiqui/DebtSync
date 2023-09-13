export const schema = gql`
  type AccountUser {
    id: String!
    name: String!
    user: User
    userId: String
    Account: [Account]!
  }

  type Query {
    accountUsers: [AccountUser!]! @requireAuth
    accountUser(id: String!): AccountUser @requireAuth
  }

  input CreateAccountUserInput {
    name: String!
    userId: String
  }

  input UpdateAccountUserInput {
    name: String
    userId: String
  }

  type Mutation {
    createAccountUser(input: CreateAccountUserInput!): AccountUser! @requireAuth
    updateAccountUser(
      id: String!
      input: UpdateAccountUserInput!
    ): AccountUser! @requireAuth
    deleteAccountUser(id: String!): AccountUser! @requireAuth
  }
`
