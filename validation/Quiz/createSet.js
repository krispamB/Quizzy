const Validator = require('validator')
const isEmpty = require('../isEmpty')

module.exports = function validateQuizinput(data) {
  let errors = {}

  data.title = isEmpty(data.title) ? '' : data.title
  data.instruction = isEmpty(data.instruction) ? '' : data.instruction

  // Title
  if(Validator.isEmpty(data.title)) {
    errors.title = 'Title field is required'
  }
  // Instructions
  if(Validator.isEmpty(data.instruction)) {
    errors.instruction = 'Insructions field is required'
  }

  return {
    errors,
    isValid: isEmpty(errors)
  }
}
