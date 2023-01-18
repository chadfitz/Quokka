const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = mongoose.model('User');
const Post = mongoose.model('Post');
const { requireUser } = require('../../config/passport');
const validatePostInput = require('../../validations/posts');

/* GET posts listing. */
router.get('/', async (req, res) => {
  try {
    const posts = await Post.find()
                              .populate("writer", "_id, username")
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
                              .populate("writer", "_id, username");
    return res.json(posts);
  }
  catch(err) {
    return res.json([]);
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id)
                             .populate("writer", "id, username");
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
router.post('/', requireUser, validatePostInput, async (req, res, next) => {

  try {
    const newPost = new Post({
      writer: req.user._id,
      recipient: req.body.recipient,
      location: req.body.location,
      subject: req.body.subject,
      body: req.body.body,
      reactions: req.body.reactions,
    });

    let post = await newPost.save();
    // command from mongoDB to return object with following dims
    post = await post.populate('writer', '_id, username');
    post = await post.populate('recipient', '_id, username');
    return res.json(post);
  }
  catch(err) {
    // console.warn(xhr.responseText);
    // console.log('err');
    // console.log(err);
    return next(err);
  }
});




router.delete('/:postId', async (req, res, next) => {

  // req.params.id, but could access any param by name
  try {
    console.log("line 89")
    const post = await Post.findById(req.params.postId)
    console.log('line 91');
    const deletedPost = await post.delete();
    console.log('line 93');
    return res.json(deletedPost);
  }
  catch(err) {
    const error = new Error('User not found');
    error.statusCode = 404;
    error.errors = { message: "No user found with that id" };
    return next(error);
  }
});

// router.delete('/:postId', async (req, res, next) => {
//   console.log('In backend/routes/api/router.delete');

//   try {
//     await Post.findById(req.params.postId)
//                              .delete()
//     // return res.json(post);
//   }
//   catch(err) {
//     const error = new Error('Post not found');
//     error.statusCode = 404;
//     error.errors = { message: "No post found with that id" };
//     return next(error);
//   }
// });
// router.delete('/post/:id', async (req, res, next) => {
//   try {
//     const post = await Post.findById(req.params.id)
//                              .delete();
//     console.log('postdsfasdfas');
//     console.log(post);
//                              res.json(post);
//   }
//   catch(err) {
//     const error = new Error('Post not found');
//     error.statusCode = 404;
//     error.errors = { message: "No post found with that id" };
//     return next(error);
//   }
// });


module.exports = router;
