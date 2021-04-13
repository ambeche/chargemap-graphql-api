'use strict';

import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username: {type: String, unique: true},
  password: {type: String, required: true},
  fullName: {type: String, required: true},
});

export default mongoose.model('User', userSchema);