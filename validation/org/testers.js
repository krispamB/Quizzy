const Validator = require('validator')
const isEmpty = require('../isEmpty')

module.exports = function validateTestersInput(data) {
  let errors = {}

  data.email = isEmpty(data.email) ? '' : data.email
  data.fullname = isEmpty(data.fullname) ? '' : data.fullname
  data.department = isEmpty(data.department) ? '' : data.department

  // Firstname validations
  if (!Validator.isLength(data.fullname, { min: 2, max: 30 })) {
    errors.fullname = 'Name must be between 2 and 30 characters'
  }

  if (Validator.isEmpty(data.fullname)) {
    errors.fullname = 'Full Name field is required'
  }

  // Deepartment validations
  if (!Validator.isLength(data.department, { min: 2, max: 30 })) {
    errors.department = 'Department must be between 2 and 30 characters'
  }

  if (Validator.isEmpty(data.department)) {
    errors.department = 'Department field is required'
  }

  // Email validations

  if (!Validator.isEmail(data.email)) {
    errors.email = 'Email is invalid'
  }

  if (Validator.isEmpty(data.email)) {
    errors.email = 'Email field is required'
  }

  return {
    errors,
    isValid: isEmpty(errors),
  }
}
