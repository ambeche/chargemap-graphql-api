'use strict';

import {gql} from 'apollo-server-express';

export default gql`
  extend type Query {
    user: User
    login(username: String!, password: String!): User
  }
  
  extend type Mutation {
    registerUser(
      username: String!,
      password: String!,
      fullName: String,
    ): User
  }
  
  type User {
    id: ID
    username: String,
    fullName: String,
    token: String
  }
`;
