export const schema = gql`
  type Account {
    id: Int!
    status: String!
    primaryUser: User!
    secondaryUser: AccountUser!
    createdAt: DateTime!
    updatedAt: DateTime!
    userId: String!
    accountUserId: Int!
    Transaction: [Transaction]!
  }

  type Query {
    accounts: [Account!]! @requireAuth
    account(id: Int!): Account @requireAuth
  }

  input CreateAccountInput {
    status: String!
    userId: String!
    accountUserId: Int!
  }

  input UpdateAccountInput {
    status: String
    userId: String
    accountUserId: Int
  }

  type Mutation {
    createAccount(input: CreateAccountInput!): Account! @requireAuth
    updateAccount(id: Int!, input: UpdateAccountInput!): Account! @requireAuth
    deleteAccount(id: Int!): Account! @requireAuth
  }
`
