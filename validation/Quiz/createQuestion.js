const Validator = require('validator')
const isEmpty = require('../isEmpty')

module.exports = function validateQuestion(data) {
  let errors = {}

  data.question = isEmpty(data.question) ? '' : data.question
  data.answer = isEmpty(data.answer) ? '' : data.answer

  // Answer
  if(Validator.isEmpty(data.answer)) {
    errors.answer = 'Answer field is required'
  }

  return {
    errors,
    isValid: isEmpty(errors)
  }
}
