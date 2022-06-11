const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const QuestionSetSchema = new Schema({
  instructions: {
    type: String,
    required: true
  },
  questions: [
    {
      type:mongoose.Schema.Types.ObjectId,
      ref: 'quiz'
    }
  ],

  duration: {
    hours: {
      type: Number,
      default: 0
    },

    minutes: {
      type: Number,
      default: 0
    },

    seconds: {
      type: Number,
      default: 0
    }
  }, 
  
}, {timestamps: true});

const QuestionSet = mongoose.model('question', QuestionSetSchema);

module.exports = QuestionSet;