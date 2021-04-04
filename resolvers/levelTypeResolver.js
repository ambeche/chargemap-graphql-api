'use strict';

import level from "../models/level.js";

export default {
  Query: {
    levelTypes: async () => {
      return await level.find({});
    }
  }
}