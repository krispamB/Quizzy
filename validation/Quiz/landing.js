const Validator = require('validator')
const isEmpty = require('../isEmpty')

module.exports = function validateLanding(data) {
  let errors = {}

  data.quizCode = isEmpty(data.quizCode) ? '' : data.quizCode
  data.email = isEmpty(data.email) ? '' : data.email

  // QuizCode
  if(Validator.isEmpty(data.quizCode)) {
    errors.quizCode = 'Quiz Code field is required'
  }
  // Email
  if(Validator.isEmpty(data.email)) {
    errors.email = 'Email field is required'
  }

  // return {
  //   errors,
  //   isValid: isEmpty(errors)
  // }
}