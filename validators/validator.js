const { validationResult } = require("express-validator");

const validator = (req, res, next) => {
  const errors = validationResult(req);

  if (errors.isEmpty()) {
    return next();
  }

  const mappedErrors = {};
  errors.array().forEach((error) => {
    mappedErrors[error.path] = error.msg; // msg مش massege
  });

  return res.status(400).json({ errors: mappedErrors });
};

module.exports = validator;
