const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const QuestionsSchema = new Schema(
  {
    question: {
      type: String,
      required: true,
    },
    options: {
      type: [],
      required: true,
    },
    answer: {
      type: String,
      required: true,
    },
    set_id: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Quizes = mongoose.model("quizzes", QuestionsSchema);

module.exports = Quizes;
