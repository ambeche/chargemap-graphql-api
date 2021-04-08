'use strict';
import {gql} from 'apollo-server-express';

export default gql`
  input PointInput {
    type: String,
    coordinates: [Float!]
  }

  type Point {
    type: String,
    coordinates: [Float!]!
   }
`;
