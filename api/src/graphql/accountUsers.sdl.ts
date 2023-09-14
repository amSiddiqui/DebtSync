export const schema = gql`
  type AccountUser {
    id: Int!
    name: String!
    user: User
    userId: String
    Account: [Account]!
  }

  type Query {
    accountUsers: [AccountUser!]! @requireAuth
    accountUser(id: Int!): AccountUser @requireAuth
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
    updateAccountUser(id: Int!, input: UpdateAccountUserInput!): AccountUser!
      @requireAuth
    deleteAccountUser(id: Int!): AccountUser! @requireAuth
  }
`
