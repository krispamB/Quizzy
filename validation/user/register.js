const Validator = require('validator');
const isEmpty = require('../isEmpty');

module.exports = function validateRegisterInput(data) {
  let errors = {};

  data.firstname = isEmpty(data.firstname) ? '' : data.firstname;
  data.surname = isEmpty(data.surname) ? '' : data.surname;
  data.username = isEmpty(data.username) ? '' : data.username;
  data.email = isEmpty(data.email) ? '' : data.email;
  data.password = isEmpty(data.password) ? '' : data.password;
  data.password2 = isEmpty(data.password2) ? '' : data.password2;


  if(!Validator.isLength(data.firstname, { min: 2, max: 30 })) {
    errors.firstname = 'Name must be between 2 and 30 characters';
  }

  if(Validator.isEmpty(data.firstname)) {
    errors.firstname = 'firstname field is required';
  }

  if(!Validator.isLength(data.surname, { min: 2, max: 30 })) {
    errors.surname = 'Name must be between 2 and 30 characters';
  }

  if(Validator.isEmpty(data.surname)) {
    errors.surname = 'surname field is required';
  }

  // Username validations

  if(!Validator.isLength(data.username, { min: 2, max: 30 })) {
    errors.username = 'Name must be between 2 and 30 characters';
  }

  if(Validator.isEmpty(data.username)) {
    errors.username = 'Username field is required';
  }

  // Email validations

  if(Validator.isEmpty(data.email)) {
    errors.email = 'Email field is required';
  }

  if(!Validator.isEmail(data.email)) {
    errors.email = 'Email is invalid';
  }

  // Password validation
  if(Validator.isEmpty(data.password)) {
    errors.password = 'Password field is required';
  }

  if(!Validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = 'Password must be at least 6 characters';
  }

  // Password2 validation
  if(Validator.isEmpty(data.password2)) {
    errors.password2 = 'Confirm password field is required';
  }

  if(!Validator.equals(data.password, data.password2)) {
    errors.password2 = 'Passwords must match'
  }

  return {
    errors,
    isValid: isEmpty(errors)
  }
}