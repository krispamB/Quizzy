const Validator = require('validator')
const isEmpty = require('../isEmpty')

module.exports = function validateQuestion(data) {
  let errors = {}

  data.question = isEmpty(data.question) ? '' : data.question
  data.options = isEmpty(data.options) ? '' : data.options
  data.answer = isEmpty(data.answer) ? '' : data.answer

  // Question
  if(Validator.isEmpty(data.question)) {
    errors.question = 'Question field is required'
  }
  // Options
  if(Validator.isEmpty(data.options)) {
    errors.options = 'Options field is required'
  }
  // Answer
  if(Validator.isEmpty(data.answer)) {
    errors.answer = 'Answer field is required'
  }

  return {
    errors,
    isValid: isEmpty(errors)
  }
}
