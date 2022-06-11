const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AnsweredQuizzes = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },

    question: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "quizzes",
    },
    chosenAnswer: {
      type: String,
      required: true,
    },

    isCorrect: {
      type: Boolean,
      default: false,
    },
    set_id: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const AnsweredQuizesSchema = mongoose.model("answeredquizzes", AnsweredQuizzes);

module.exports = AnsweredQuizesSchema;
