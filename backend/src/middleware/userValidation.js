const { body } = require("express-validator");

exports.signupValidation = [
  // GraphQL POST bodies put variables under `variables`, so validate accordingly
  body("variables.input.username")
    .isLength({ min: 3 })
    .withMessage("Username must be at least 3 characters"),

  body("variables.input.email")
    .isEmail()
    .withMessage("Invalid email format"),

  body("variables.input.password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters"),
];