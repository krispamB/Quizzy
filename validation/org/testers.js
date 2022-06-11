const Validator = require("validator");
const isEmpty = require("../isEmpty");

module.exports = function validateTestersInput(data) {
  let errors = {};

  data.fullName = isEmpty(data.fullName) ? "" : data.fullName;
  data.department = isEmpty(data.department) ? "" : data.department;
  data.email = isEmpty(data.email) ? "" : data.email;

  // Fullname validations
  if ((!Validator.isLength(data.fullName, { min: 2, max: 30 }))) {
    errors.fullName = "Name must be between 2 and 30 characters";
  }

  if (Validator.isEmpty(data.fullName)) {
    errors.fullName = "Fullname field is required";
  }

  // Deepartment validations
  if ((!Validator.isLength(data.department, { min: 2, max: 30 }))) {
    errors.department = "Department must be between 2 and 30 characters";
  }

  if (Validator.isEmpty(data.department)) {
    errors.department = "Department field is required";
  }

  // Email validations

  if (!Validator.isEmail(data.email)) {
    errors.email = "Email is invalid";
  }

  if (Validator.isEmpty(data.email)) {
    errors.email = "Email field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
