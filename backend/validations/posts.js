const { check } = require("express-validator");
const handleValidationErrors = require('./handleValidationErrors');

// validatePostInput is a combination Express middleware that uses the `check`
// middleware to validate the keys in the body of a request to create/edit
// a post
const validatePostInput = [
  check('writer')
    .exists({ checkFalsy: true })
    .withMessage('Post must have a writer'),
  check('recipient')
    .exists({ checkFalsy: true })
    .withMessage('Post must have a recipient'),
  check('location')
    .exists({ checkFalsy: true })
    .withMessage('Post must have a location'),
  check('body')
    .exists({ checkFalsy: true })
    .isLength({ min: 5, max: 5000 })
    .withMessage('Post must be between 5 and 140 characters'),
  check('subject')
    .exists({ checkFalsy: true })
    .withMessage('Post must contain a subject'),
  handleValidationErrors
];

module.exports = validatePostInput;
