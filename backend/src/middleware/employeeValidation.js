const { body } = require("express-validator");

exports.employeeValidation = [
  body("variables.input.first_name")
    .notEmpty()
    .withMessage("First name is required"),

  body("variables.input.last_name")
    .notEmpty()
    .withMessage("Last name is required"),

  body("variables.input.salary")
    .isFloat({ min: 1000 })
    .withMessage("Salary must be at least 1000"),

  body("variables.input.designation")
    .notEmpty()
    .withMessage("Designation is required"),

  body("variables.input.department")
    .notEmpty()
    .withMessage("Department is required"),
];