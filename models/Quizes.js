const mongoose = require('mongoose')
const Schema = mongoose.Schema

const QuestionsSchema = new Schema(
  {
    question: {
      type: String,
      required: false,
    },
    cloudinary_id: {
      type: String
    },
    options: {
      type: [],
      required: true,
    },
    answer: {
      type: String,
      required: true,
    },
    question_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'sets',
    },
  },
  {
    timestamps: true,
  }
)

const Quizes = mongoose.model('quizzes', QuestionsSchema)

module.exports = Quizes
