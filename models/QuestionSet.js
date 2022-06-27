const mongoose = require("mongoose");
const testers = require("../validation/org/testers");
const Schema = mongoose.Schema;

const QuestionSetSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    instruction: {
      type: String,
      required: true,
    },
    questions: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "quizzes", 
      },
    ],

    duration: {
      hours: {
        type: Number,
        default: 0,
      },

      minutes: {
        type: Number,
        default: 0,
      },

      seconds: {
        type: Number,
        default: 0,
      },
    },
  },
  { timestamps: true }
);

const QuestionSet = mongoose.model("sets", QuestionSetSchema);

module.exports = QuestionSet;
