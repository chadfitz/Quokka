const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = mongoose.model('User');
const Post = mongoose.model('Post');
const multer = require('multer');
const upload = multer();
const Reply = mongoose.model('Reply');
const { requireUser } = require('../../config/passport');


router.get('/:postId', async (req, res, next) => {
  let replies;

  try {
    replies = await Reply.findById(req.params.postId);
  } catch (err) {
    const error = new Error('Reply not found');
    error.statusCode = 404;
    error.errors = { message: "No reply found with that id" };
    return next(error);
  }

  return res.json(replies);
});

router.post('/', requireUser, upload.none(), async (req, res, next) => {
  const newReply = new Reply({
    user: req.user._id,
    post: req.body.postId,
    body: req.body.body
  });

  let reply = await newReply.save();

  return res.json(reply);
});


module.exports = router;