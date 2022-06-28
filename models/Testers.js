const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TestersSchema = new Schema({
  email: {
    type: String,
    required: true
  },
});

const Testers = mongoose.model("testers", TestersSchema);

module.exports = Testers;
