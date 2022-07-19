const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Create new Schema
const OrgprofileSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'orgs',
  },
  handle: {
    type: String,
    required: true,
  },
  website: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  zipcode: {
    type: String,
    required: false,
  },
  address: {
    type: String,
    required: true,
  },
  testers:[
    {
      type:Schema.Types.ObjectId,
      ref:"testers"
    }
  ],
  date: {
    type: Date,
    default: Date.now,
  },
})




module.exports = orgProfile = mongoose.model("OrgProfile", OrgprofileSchema);


