"use strict";
import Connection from "../models/connection.js";

export default {
  Query: {
    connections: async () => {
      return await Connection.find({})
        .populate("ConnectionTypeID")
        .populate("CurrentTypeID")
        .populate("LevelID")
        .limit(10);
    },
  },
};
