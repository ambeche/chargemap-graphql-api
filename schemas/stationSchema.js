'use strict';
import {gql} from 'apollo-server-express';

export default gql`
  extend type Query {
    station (stationID: ID!): Station!
    stations (start: Int, limit: Int, bounds: BoundsInput): [Station]!
  }

  extend type Mutation {
    addStation(
      Title: String!,
      Town: String!,
      AddressLine1: String!,
      StateOrProvince: String!,
      Postcode: String!,
      Location: PointInput!,
      Connections: [ConnectionInput]!,
    ): Station!,

    modifyStation(
      id: ID!,
      Title: String,
      Town: String,
      AddressLine1: String,
      StateOrProvince: String,
      Postcode: String,
      Location: PointInput,
      Connections: [ConnectionInput],
    ): Station!,

    deleteStation(
      id: ID!
    ): Station
  }

  type Station {
    id: ID
    Title: String,
    Town: String,
    AddressLine1: String,
    StateOrProvince: String,
    Postcode: String,
    Location: Point!,
    Connections: [Connection]
  }
`;
