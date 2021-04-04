'use strict';
import {gql} from 'apollo-server-express';

export default gql`
  extend type Query {
    levelTypes: [LevelType!]!
  }

  type LevelType {
    id: ID
    Title: String
    Comments: String
    IsFastChargeCapable: Boolean
  }
`;
