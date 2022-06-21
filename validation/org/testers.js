const Validator = require('validator')
const isEmpty = require('../isEmpty')

module.exports = function validateTestersInput(data) {
  let errors = {}

  data.email = isEmpty(data.email) ? '' : data.email
  data.firstname = isEmpty(data.firstname) ? '' : data.firstname
  data.surname = isEmpty(data.surname) ? '' : data.surname
  data.middlename = isEmpty(data.middlename) ? '' : data.middlename
  data.username = isEmpty(data.username) ? '' : data.username
  data.department = isEmpty(data.department) ? '' : data.department

  // Firstname validations
  if (!Validator.isLength(data.firstname, { min: 2, max: 30 })) {
    errors.firstname = 'Name must be between 2 and 30 characters'
  }

  if (Validator.isEmpty(data.firstname)) {
    errors.firstname = 'First Name field is required'
  }

  // Surname validations
  if (!Validator.isLength(data.surname, { min: 2, max: 30 })) {
    errors.surname = 'Name must be between 2 and 30 characters'
  }

  if (Validator.isEmpty(data.surname)) {
    errors.surname = 'Surname field is required'
  }

  // Middlename validations
  if (!Validator.isLength(data.middlename, { min: 2, max: 30 })) {
    errors.middlename = 'Name must be between 2 and 30 characters'
  }

  if (Validator.isEmpty(data.middlename)) {
    errors.middlename = 'Middle Name field is required'
  }

  // Username validations
  if (!Validator.isLength(data.username, { min: 2, max: 30 })) {
    errors.username = 'Name must be between 2 and 30 characters'
  }

  if (Validator.isEmpty(data.username)) {
    errors.username = 'Username field is required'
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
