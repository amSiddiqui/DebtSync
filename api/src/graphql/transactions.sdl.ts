export const schema = gql`
  type Transaction {
    id: Int!
    amount: Int!
    debit: Boolean!
    title: String!
    description: String!
    account: Account!
    date: DateTime!
    createdAt: DateTime!
    updatedAt: DateTime!
    accountId: Int!
  }

  type Query {
    transaction(id: Int!, userId: String!): Transaction @requireAuth
    accountTransactions(accountId: Int!, userId: String): [Transaction!]!
      @requireAuth
  }

  input CreateTransactionInput {
    amount: Int!
    debit: Boolean!
    title: String!
    date: DateTime!
    description: String!
    accountId: Int!
  }

  input UpdateTransactionInput {
    amount: Int
    debit: Boolean
    title: String
    date: DateTime
    description: String
    accountId: Int
  }

  type Mutation {
    createTransaction(
      input: CreateTransactionInput!
      userId: String!
    ): Transaction! @requireAuth
    updateTransaction(
      id: Int!
      input: UpdateTransactionInput!
      userId: String
    ): Transaction! @requireAuth
    deleteTransaction(id: Int!, userId: String): Transaction! @requireAuth
  }
`
