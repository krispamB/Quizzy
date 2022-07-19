const mongoose = require('mongoose')
const testers = require('../validation/org/testers')
const Schema = mongoose.Schema

const QuestionSetSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'orgs',
    },
    title: {
      type: String,
      required: true,
    },
    instruction: {
      type: String,
      required: true,
    },
    questions: [],
    duration: {
      type: String,
      required: true,
    },
    quizCode: {
      type: String,
    },
    testers: [],
  },
  { timestamps: true }
)

const QuestionSet = mongoose.model('sets', QuestionSetSchema)

module.exports = QuestionSet
