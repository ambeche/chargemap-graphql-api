'use strict';
import {gql} from 'apollo-server-express';

export default gql`
  input BoundsInput {
   _southWest: LatLng!,
   _northEast: LatLng!,
  }

  input LatLng {
    lat: Float!
    lng: Float!
   }
`;
