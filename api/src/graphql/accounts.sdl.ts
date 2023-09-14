export const schema = gql`
  type Account {
    id: Int!
    status: String!
    name: String!
    user: User!
    linkedUser: User
    createdAt: DateTime!
    updatedAt: DateTime!
    userId: String!
    linkedUserId: String
    accountUserId: Int!
    Transaction: [Transaction]!
  }

  type Query {
    accounts: [Account!]! @requireAuth
    account(id: Int!): Account @requireAuth
  }

  input CreateAccountInput {
    status: String!
    name: String!
    userId: String!
    linkedUserId: String
    accountUserId: Int!
  }

  input UpdateAccountInput {
    status: String
    name: String
    userId: String
    linkedUserId: String
    accountUserId: Int
  }

  type Mutation {
    createAccount(input: CreateAccountInput!): Account! @requireAuth
    updateAccount(id: Int!, input: UpdateAccountInput!): Account! @requireAuth
    deleteAccount(id: Int!): Account! @requireAuth
  }
`
