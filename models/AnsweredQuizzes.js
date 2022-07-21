const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AnsweredQuizzes = new Schema(
  {
    user: {
      type: String
    },
    quizCode: {
      type: String,
    },
    email: {
      type: String
    },
    mark: {
      type: Number
    },
  },
  { timestamps: true }
);

const AnsweredQuizesSchema = mongoose.model("answeredquizzes", AnsweredQuizzes);

module.exports = AnsweredQuizesSchema;
