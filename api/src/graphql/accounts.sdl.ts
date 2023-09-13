export const schema = gql`
  type Account {
    id: Int!
    status: String!
    primaryUser: User!
    secondaryUser: AccountUser!
    createdAt: DateTime!
    updatedAt: DateTime!
    userId: String!
    accountUserId: String!
    Transaction: [Transaction]!
  }

  type Query {
    accounts: [Account!]! @requireAuth
    account(id: Int!): Account @requireAuth
  }

  input CreateAccountInput {
    status: String!
    userId: String!
    accountUserId: String!
  }

  input UpdateAccountInput {
    status: String
    userId: String
    accountUserId: String
  }

  type Mutation {
    createAccount(input: CreateAccountInput!): Account! @requireAuth
    updateAccount(id: Int!, input: UpdateAccountInput!): Account! @requireAuth
    deleteAccount(id: Int!): Account! @requireAuth
  }
`
