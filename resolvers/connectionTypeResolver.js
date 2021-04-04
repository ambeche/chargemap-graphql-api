'use strict';
import ConnectionType from '../models/connectionType.js';

export default {
  Query: {
    connectionTypes: async () => {
      return await ConnectionType.find({});
    }
  },
  Connection: {
    // resolves connectionType field of Connection Schema
    ConnectionTypeID: async (parent) => {
      return await ConnectionType.findById(parent.ConnectionTypeID);
    }
  }
}