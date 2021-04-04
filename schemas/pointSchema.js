'use strict';
import {gql} from 'apollo-server-express';

export default gql`
  input PointInput {
   coordinates: [Float!]
  }

  type Point {
    coordinates: [Float!]!
   }
`;
