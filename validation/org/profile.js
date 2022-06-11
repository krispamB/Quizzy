const Validator = require('validator');
const isEmpty = require('../isEmpty');

module.exports = function validateProfileInput(data) {
  let errors = {};

  data.handle = isEmpty(data.handle) ? '' : data.handle;
  data.website = isEmpty(data.website) ? '' : data.website;
  data.country = isEmpty(data.country) ? '' : data.country;
  data.city = isEmpty(data.city) ? '' : data.city;
  data.address = isEmpty(data.address) ? '' : data.address;

  if(!Validator.isLength(data.handle, { min: 2, max: 40 })) {
    errors.handle = 'Handle needs to be between 2 and 4 characters'
  }

  if(Validator.isEmpty(data.handle)) {
    errors.handle = 'Profile handle is required'
  }
 
  if(Validator.isEmpty(data.website)) {
    errors.website = 'Organisation website is required'
  }

  if(Validator.isEmpty(data.country)) {
    errors.country = 'Country field is required'
  }

  if(Validator.isEmpty(data.city)) {
    errors.city = 'City field is requred'
  }

  if(Validator.isEmpty(data.address)) {
    errors.address = 'Address field is required'
  }


  return {
    errors,
    isValid: isEmpty(errors)
  }
}