export const schema = gql`
  type User {
    id: Int!
    auth0Sub: String!
    email: String!
    name: String
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  type Query {
    users: [User!]! @requireAuth
    user(id: Int!): User @requireAuth
    userAuth0(auth0Sub: String!): User @requireAuth
  }

  input CreateUserInput {
    auth0Sub: String!
    email: String!
    name: String
  }

  input UpdateUserInput {
    auth0Sub: String
    email: String
    name: String
  }

  type Mutation {
    createUser(input: CreateUserInput!): User! @requireAuth
    updateUser(id: Int!, input: UpdateUserInput!): User! @requireAuth
    deleteUser(id: Int!): User! @requireAuth
  }
`
