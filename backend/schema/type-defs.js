const { gql } = require("apollo-server");
const typeDefs = gql`
  type User {
    id: ID!
    name: String!
    email: String!
    address: String!
    gender: String!
    age: Int!
  }
  type Query {
    users: [User!]!
    getUserById(id: ID!): User!
  }

  type Mutation {
    createUser(
      name: String!
      address: String!
      email: String!
      gender: String!
      age: Int!
    ): User!
    updateUser(
      id: ID!
      name: String
      address: String
      email: String
      gender: String
      age: Int
    ): User!
    deleteUser(id: ID!): User!
  }
`;
module.exports = { typeDefs };

