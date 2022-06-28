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
    required: false
  },
  name: {
    type: String,
    required: false
  },
  email: {
    type: String,
    required: false
  },
  accounttype: {
    type: String,
    required: false
  },
  password: {
    type: String,
    required: false
  },
  password2: {
    type: String,
    required: false
  },
  date: {
    type: Date,
    default: Date.now 
  },
});

module.exports = Profile = mongoose.model('profile', ProfileSchema);