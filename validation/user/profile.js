const Validator = require('validator');
const isEmpty = require('../isEmpty');

module.exports = function validateProfileInput(data) {
  let errors = {};

  data.handle = isEmpty(data.handle) ? '' : data.handle;
  data.username = isEmpty(data.username) ? '' : data.username;
  data.accounttype = isEmpty(data.accounttype) ? '' : data.accounttype;
  data.password = isEmpty(data.password) ? '' : data.password;
  data.password2 = isEmpty(data.password2) ? '' : data.password2;


  if(!Validator.isLength(data.handle, { min: 2, max: 40 })) {
    errors.handle = 'Handle needs to be between 2 and 4 characters';
  }

  if(Validator.isEmpty(data.handle)) {
    errors.handle = 'Profile handle is required';
  }

  if(Validator.isEmpty(data.username)) {
    errors.username = 'Account field is required';
  }

  if(Validator.isEmpty(data.accounttype)) {
    errors.accounttype = 'Account field is required';
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