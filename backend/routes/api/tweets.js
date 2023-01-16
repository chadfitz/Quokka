const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = mongoose.model('User');
const Tweet = mongoose.model('Tweet');
const { requireUser } = require('../../config/passport');
const validateTweetInput = require('../../validations/tweets');

/* GET tweets listing. */
router.get('/', async (req, res) => {
  try {
    const tweets = await Tweet.find()
                              .populate("author", "_id, username")
                              .sort({ createdAt: -1 });
    return res.json(tweets);
  }
  catch(err) {
    return res.json([]);
  }
});

router.get('/user/:userId', async (req, res, next) => {
  let user;
  try {
    user = await User.findById(req.params.userId);
  } catch(err) {
    const error = new Error('User not found');
    error.statusCode = 404;
    error.errors = { message: "No user found with that id" };
    return next(error);
  }
  try {
    const tweets = await Tweet.find({ author: user._id })
                              .sort({ createdAt: -1 })
                              .populate("author", "_id, username");
    return res.json(tweets);
  }
  catch(err) {
    return res.json([]);
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const tweet = await Tweet.findById(req.params.id)
                             .populate("author", "id, username");
    return res.json(tweet);
  }
  catch(err) {
    const error = new Error('Tweet not found');
    error.statusCode = 404;
    error.errors = { message: "No tweet found with that id" };
    return next(error);
  }
});

// Attach requireUser as a middleware before the route handler to gain access
// to req.user. (requireUser will return an error response if there is no 
// current user.) Also attach validateTweetInput as a middleware before the 
// route handler.
router.post('/', requireUser, validateTweetInput, async (req, res, next) => {
  try {
    const newTweet = new Tweet({
      text: req.body.text,
      author: req.user._id
    });

    let tweet = await newTweet.save();
    tweet = await tweet.populate('author', '_id, username');
    return res.json(tweet);
  }
  catch(err) {
    next(err);
  }
});

module.exports = router;