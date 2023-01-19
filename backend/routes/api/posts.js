const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = mongoose.model('User');
const Post = mongoose.model('Post');
const { requireUser } = require('../../config/passport');
const validatePostInput = require('../../validations/posts');
const { multipleFilesUpload, multipleMulterUpload } = require("../../awsS3");

/* GET posts listing. */
router.get('/', async (req, res) => {
  try {
    const posts = await Post.find()
                              .populate("writer", "_id, username profileImageUrl")
                              .sort({ createdAt: -1 });
    return res.json(posts);
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
    const posts = await Post.find({ writer: user._id })
                              .sort({ createdAt: -1 })
                              .populate("writer", "_id, username profileImageUrl");
    return res.json(posts);
  }
  catch(err) {
    return res.json([]);
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id)
                             .populate("writer", "id, username profileImageUrl");
    return res.json(post);
  }
  catch(err) {
    const error = new Error('Post not found');
    error.statusCode = 404;
    error.errors = { message: "No post found with that id" };
    return next(error);
  }
});

// Attach requireUser as a middleware before the route handler to gain access
// to req.user. (requireUser will return an error response if there is no
// current user.) Also attach validatePostInput as a middleware before the
// route handler.
router.post('/', multipleMulterUpload("images"), requireUser, validatePostInput, async (req, res, next) => {

  const imageUrls = await multipleFilesUpload({ files: req.files, public: true });

  try {
    const newPost = new Post({
      writer: req.user._id,
      recipient: req.body.recipient,
      location: JSON.parse(req.body.location),
      subject: req.body.subject,
      body: req.body.body,
      imageUrls, 
      reactions: req.body.reactions,
    });

    let post = await newPost.save();
    // command from mongoDB to return object with following dims
    post = await post.populate('writer', '_id, username');
    post = await post.populate('recipient', '_id, username');
    return res.json(post);
  }
  catch(err) {
    return next(err);
  }
});

// EDIT
router.patch('/:id', multipleMulterUpload('images'),requireUser, async (req, res, next) => {
  try {
    // console.log(req.params)
    // const post = await Post.findById(req.params.id);
    // console.log(req.user);
    // if(req.files) {
    const imageUrls = await multipleFilesUpload({ files: req.files, public: true });
    // }
    const updatedPost = await Post.updateOne({_id: req.params.id}, {  
      location: JSON.parse(req.body.location),
      subject: req.body.subject,
      body: req.body.body,
      imageUrls
    })
    // const updatedPost = await Post.updateOne({_id: req.params.id}, {  
    //   location: JSON.parse(req.body.location),
    //   subject: req.body.subject,
    //   body: req.body.body,
    //   imageUrls
    //   // reactions: req.body.reactions
    // }, function (err, docs) {
    //     if (err){
    //       console.log("llama", err)
    //     } else {
    //       console.log("Updated Docs : ", docs);
    //   }}
    // )
    return res.json(updatedPost);
  }
  catch(err) {
    const error = new Error('Post not found');
    error.statusCode = 404;
    error.errors = { message: "No post found with that id" };
    return next(err);
  }
});

// DELETE
router.delete('/:postId', async (req, res, next) => {
  try {
    console.log(req.params.postId)
    const post = await Post.findById(req.params.postId)
    await post.delete()
    // Post.deleteOne({_id: req.params.postId})
    return res.json(null);
  }
  catch(err) {
    const error = new Error('Post not found in delete');
    error.statusCode = 404;
    error.errors = { message: "No post found with that id" };
    return next(error);
  }
});

module.exports = router;
