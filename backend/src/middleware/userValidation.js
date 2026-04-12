const { body } = require("express-validator");

exports.signupValidation = [
  body("input.username")
    .isLength({ min: 3 })
    .withMessage("Username must be at least 3 characters"),

  body("input.email")
    .isEmail()
    .withMessage("Invalid email format"),

  body("input.password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters"),
];