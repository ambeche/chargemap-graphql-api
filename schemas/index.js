'use strict';
import {gql} from 'apollo-server-express';
import currentTypeSchema from './currentTypeSchema.js';
import connectionTypeSchema from './connectionTypeSchema.js';
import levelSchema from './levelSchema.js';
import connectionSchema from './connectionSchema.js';
import pointSchema from './pointSchema.js';
import stationSchema from './stationSchema.js';

const root = gql`
   type Query {
     _: Boolean
   }
   type Mutation {
     _: Boolean
   }
`;

export default [
  root,
  currentTypeSchema,
  connectionTypeSchema,
  levelSchema,
  connectionSchema,
  pointSchema,
  stationSchema,
];
