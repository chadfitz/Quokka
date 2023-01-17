const { check } = require("express-validator");
const handleValidationErrors = require('./handleValidationErrors');

// validatePostInput is a combination Express middleware that uses the `check`
// middleware to validate the keys in the body of a request to create/edit
// a post
const validatePostInput = [
  check('body')
    .exists({ checkFalsy: true })
    .isLength({ min: 5, max: 140 })
    .withMessage('Post must be between 5 and 140 characters'),
  handleValidationErrors
];

module.exports = validatePostInput;
