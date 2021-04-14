"use strict";
import Station from "../models/station.js";
import Connection from "../models/connection.js";
import rectangleBounds from "../helper.js";
import {AuthenticationError} from "apollo-server-errors";

const verifyAuthentication = (user) => {
  if (!user) {
    throw new AuthenticationError('You are not authenticated');
  }
}
export default {
  Mutation: {
    addStation: async (parent, args, {user}) => {
      verifyAuthentication(user) // check and throw error if user is not authenticated
      try {
        // creates connections for station and save to db using Promise.all
        const connectionDocs = args.Connections.map(
          (conn) =>
            new Connection({
              ConnectionTypeID: conn.ConnectionTypeID,
              CurrentTypeID: conn.CurrentTypeID,
              LevelID: conn.LevelID,
              Quantity: Number(conn.Quantity),
            })
        );
        const connectionsFromDb = await Promise.all(
          connectionDocs.map((doc) => doc.save())
        );
        console.log("connInDB", connectionsFromDb);

        // new station is created using the ObjectId of the newly created connections from updateInfo
        const connectionsIDs = connectionsFromDb.map((conn) => conn._id);
        console.log("connection ids", connectionsIDs);
        const stationDoc = new Station({
          Title: args.Title,
          Town: args.Town,
          AddressLine1: args.AddressLine1,
          StateOrProvince: args.StateOrProvince,
          Postcode: args.Postcode,
          Location: args.Location,
          Connections: connectionsIDs,
        });

        const savedStation = await stationDoc.save();
        console.log("saved station", savedStation);

        savedStation.Connections = connectionsFromDb;
        console.log("resolved ", savedStation);
        return savedStation;
      } catch (e) {
        console.error("addStation error", e.message);
      }
    },
    modifyStation: async (parent, args, {user}) => {  
      verifyAuthentication(user) 
      try {
        // extract connection ids from station's connection field to be saved as ref to Connection in station doc in db
        const connectionIDs = args.Connections
          ? args.Connections.map((conn) => conn.id)
          : undefined;
        const newUpdate = {...args};
        newUpdate.Connections = connectionIDs;

        return await (
          await Station.findOneAndUpdate(args.id, newUpdate, {
            new: true,
            omitUndefined: true,
          })
        )
      } catch (e) {
        console.log("modifyStation error", e.message);
      }
    },
    deleteStation: async (parent, args, {user}) => {
      verifyAuthentication(user)
      try {
        const isInDB = await Station.findById(args.id)
        if(isInDB)  {
          await Station.findByIdAndRemove(args.id) // deleted
          return isInDB // return the state of the before it was deleted: for confirmation.
        }
        return null
      }catch (e) {
        console.log('e', e.message)
        throw new AuthenticationError('You are not authenticated');
      }
    }
  },

  Query: {
    station: async (parent, args) => {
      const stationFromDB = await Station.findById(args.stationID).populate(
        "Connections"
      );
      console.log("station Query", stationFromDB);
      return stationFromDB;
    },
    stations: async (parent, args) => {
      let queriedStations;
      const start = args.start ? args.start : 0;
      //limit restricted to 20, default is 10
      const limit = args.limit && args.limit < 20 ? args.limit : 10;
      try {
        if (!args.bounds) {
          // filter by start and limit parameters
          queriedStations = await Station.find({})
            .skip(start)
            .limit(limit)
            .populate("Connections");
        } else if (args.bounds) {
          console.log("bounds", args.bounds);
          // filtering by geo polygon
          const northEast = args.bounds._northEast;
          const southWest = args.bounds._southWest;
          queriedStations = await Station.find({})
            .where("Location")
            .within(
              rectangleBounds(northEast, southWest) // returns a geo polygon from coordinates
            )
            .skip(start)
            .limit(limit)
            .populate("Connections");
        }
        return queriedStations;
      } catch (e) {
        console.log(e.message);
      }
    },
  },
};
