const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const ProfileSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  handle: {
    type: String,
    required: true,
    max: 40
  },
  username: {
    type: String,
    required: true
  },
  accounttype: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  password2: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now 
  },
});

module.exports = Profile = mongoose.model('profile', ProfileSchema);