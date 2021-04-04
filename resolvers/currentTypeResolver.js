'use strict';

import currentType from "../models/currentType.js";

export default {
  Query: {
    currentTypes: async () => {
      return await currentType.find({});
    }
  }
}