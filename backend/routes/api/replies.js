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
  let repliesArray;
  try {
    repliesArray = await Reply.find({post: req.params.postId})
                         .populate("user", "_id, username profileImageUrl")
                         .sort({ createdAt: -1 })
  } catch (err) {
    const error = new Error('Reply not found');
    error.statusCode = 404;
    error.errors = { message: "No reply found with that id" };
    return next(error);
  }
  const repliesObject = repliesArray.reduce((obj, item) => (obj[item._id] = item, obj) , {});
  return res.json(repliesObject);
});

router.post('/:postId', requireUser, upload.none(), async (req, res, next) => {
  const newReply = new Reply({
    post: req.params.postId,
    user: req.user._id,
    body: req.body.body
  });

  await newReply.populate("user", "_id, username profileImageUrl")

  let reply = await newReply.save();
  const replyObject = {[reply._id]: reply};

  return res.json(replyObject);
});

router.delete('/:replyId', requireUser, async (req, res, next) => {
  try {
    const reply = await Reply.findById(req.params.replyId);
    await reply.delete();
    return res.json(null);
  } catch (err) {
    const error = new Error('Reply not found in delete');
    error.statusCode = 404;
    error.errors = { message: "No reply found with that id"};
    return next(error);
  }
});


module.exports = router;