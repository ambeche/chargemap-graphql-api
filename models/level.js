'use strict';
import mongoose from 'mongoose';

const levelSchema = new mongoose.Schema({
  Title: String,
  Comments: String,
  IsFastChargeCapable: Boolean,
});

export default mongoose.model('Level', levelSchema);
