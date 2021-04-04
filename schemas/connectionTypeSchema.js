'use strict';
import {gql} from 'apollo-server-express';

export default gql`
   extend type Query {
     connectionTypes: [ConnectionType!]!
   }

   type ConnectionType {
      id: ID
      FormalName: String,
      Title: String,
   }
`;
