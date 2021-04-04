'use strict';
import ConnectionType from '../models/connectionType.js';

export default {
  Query: {
    connectionTypes: async () => {
      return await ConnectionType.find({});
    }
  }
}