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
    transactions: [Transaction!]! @requireAuth
    transaction(id: Int!): Transaction @requireAuth
    accountTransactions(accountId: Int!): [Transaction!]! @requireAuth
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
    createTransaction(input: CreateTransactionInput!): Transaction! @requireAuth
    updateTransaction(id: Int!, input: UpdateTransactionInput!): Transaction!
      @requireAuth
    deleteTransaction(id: Int!): Transaction! @requireAuth
  }
`
