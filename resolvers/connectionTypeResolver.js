'use strict';
import ConnectionType from '../models/connectionType.js';

export default {
  Query: {
    connectionTypes: async () => {
      return await ConnectionType.find({});
    }
  },
  Connection: {
    ConnectionTypeID: async (parent) => {
      return await ConnectionType.findById(parent.ConnectionTypeID);
    }
  }
}