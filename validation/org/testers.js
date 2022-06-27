const Validator = require("validator");
const isEmpty = require("../isEmpty");

module.exports = function validateTestersInput(data) {
  let errors = {};

  data.email = isEmpty(data.email) ? "" : data.email;
  // console.log(data)
  // Email validations

  if (!Validator.isEmail(data.email)) {
    errors.email = "Email is invalid";
  }

  if (Validator.isEmpty(data.email)) {
    errors.email = "Email field is required";
  }

  

  return {
    errors,
    // isValid: isEmpty(),
  };
};
