const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create new Schema
const OrgSchema = new Schema({
  orgname: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  token: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  }
})

module.exports = Org = mongoose.model('orgs', OrgSchema);