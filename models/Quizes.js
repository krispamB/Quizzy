const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// const optionSchema = new Schema({
//   option: {
//     type: String,
//     required: true
//   }
// });

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
      type: Number,
      required: true,
    },

    isCorrectAnswer: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Quizes = mongoose.model("quizzes", QuestionsSchema);

module.exports = Quizes;
