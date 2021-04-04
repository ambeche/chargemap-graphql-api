'use strict';

import Level from "../models/level.js";


export default {
  Query: {
    levelTypes: async () => {
      return await Level.find({});
    }
  },
  Connection: {
    LevelID: async (parent) => {
      return await Level.findById(parent.LevelID);
    }
  }
}