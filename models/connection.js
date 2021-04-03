'use strict';
import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const connectionSchema = new Schema({
  Quantity: Number,
  ConnectionTypeID: {type: Schema.Types.ObjectId, ref: 'ConnectionType'},
  CurrentTypeID: {type: Schema.Types.ObjectId, ref: 'CurrentType'},
  LevelID: {type: Schema.Types.ObjectId, ref: 'Level'},
});

export default mongoose.model('Connection', connectionSchema);
