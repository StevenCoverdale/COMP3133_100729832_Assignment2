const { validationResult } = require("express-validator");

exports.handleValidation = (req) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const formatted = errors.array().map(err => ({
      field: err.param,
      message: err.msg
    }));
    throw new Error(JSON.stringify(formatted));
  }
};