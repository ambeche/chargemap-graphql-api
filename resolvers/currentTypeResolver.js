'use strict';

import CurrentType from "../models/currentType.js";

export default {
  Query: {
    currentTypes: async () => {
      return await CurrentType.find({});
    }
  },
  Connection: {
    CurrentTypeID: async (parent) => {
      return await CurrentType.findById(parent.CurrentTypeID);
    }
  }
}