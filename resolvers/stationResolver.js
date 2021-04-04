'use strict';
import Station from '../models/station.js';
import Connection from '../models/connection.js';

export default {
  Mutation: {
    addStation: async (parent, args) => {
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
        console.log('resolved ', savedStation);
        return savedStation;
        
      } catch (e) {
        console.error("addStation error", e.message);
      }
    }
  }
}