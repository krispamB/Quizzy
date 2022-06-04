const Validator = require('validator');
const isEmpty = require('../isEmpty');

module.exports = function validateRegisterInput(data) {
  let errors = {};

  data.orgname = isEmpty(data.orgname) ? '' : data.orgname;
  data.email = isEmpty(data.email) ? '' : data.email;
  data.address = isEmpty(data.address) ? '' : data.address;
  data.password = isEmpty(data.password) ? '' : data.password;
  data.password2 = isEmpty(data.password2) ? '' : data.password2;

  // Orgname validation
  if(!Validator.isLength(data.orgname, { min: 2, max: 30 })) {
    errors.orgname = 'Name must be between 2 and 30 characters';
  }

  if(Validator.isEmpty(data.orgname)) {
    errors.orgname = 'Orgname field is required';
  }

  // Email validation
  if(Validator.isEmpty(data.email)) {
    errors.email = 'Email field is required';
  }

  if(!Validator.isEmail(data.email)) {
    errors.email = 'Email is invalid';
  }

  // address validation
  if(!Validator.isLength(data.address, { min: 2, max: 50 })) {
    errors.address = 'address must be between 2 and 50 characters';
  }

  if(Validator.isEmpty(data.address)) {
    errors.address = 'address field is required';
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