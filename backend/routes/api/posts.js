const { json } = require('express');
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
    return next(err);
  }
});




router.delete('/:postId', async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.postId).delete()
    return res.json(post);
  }
  catch(err) {
    const error = new Error('Post not found');
    error.statusCode = 404;
    error.errors = { message: "No post found with that id" };
    return next(error);
  }
});

// IN PROGRESS --- Creates a reaction to a post
router.patch('/createReaction/:postId', async (req, res, next) => {
  try {
    const { postId } = req.params
    const { reactorId, newEmotion } = req.body

    const post = await Post.findById(postId)
    const userReactionObject = post.reactions.find( (reactionObject) => (reactionObject.user == reactorId) )

    // AN INVALID USER ID WILL THROW AN ERROR
    if (!userReactionObject) {
      // CREATE NEW USER REACTION OBJECT IF IT DOESN'T EXIST
      post.reactions.push({user: reactorId, emotions: newEmotion})
    } else if (!userReactionObject.emotions.some( oldEmotion => (oldEmotion == newEmotion))) {
      // ADD --NEW EMOTION-- TO EMOTION ARRAY
      userReactionObject.emotions.push(newEmotion)
    }

    await post.save()

    return res.json(post)

  } catch(err) {
    const error = new Error('Reaction could not be made');
    error.statusCode = 422;
    error.errors = { message: "User unable to react to post"};
    return next(error)
  }
})


// IN PROGRESS -- Removes reaction to a post
router.patch('/removeReaction/:postId', async (req, res, next) => {
  try {
    const { postId } = req.params
    const { reactorId, emotionToRemove } = req.body

    const post = await Post.findById(postId)
    const userReactionObject = post.reactions.find( (reactionObject) => (reactionObject.user == reactorId) )

    if (!userReactionObject) {
      // If no user reaction object, user cannot remove reaction so no operation is done

    } else if (userReactionObject.emotions.some( oldEmotion => (oldEmotion == emotionToRemove))) {
      // If user reaction object exists and includes the emotion to remove, remove it
      userReactionObject.emotions.pull(emotionToRemove)
    }

    await post.save()

    return res.json(post)

  } catch (err) {
    const error = new Error ('Reaction couldn\'t be made');
    error.statusCode = 422;
    error.errors = { message: "User could not remove reaction to post"}
    return next(error)
  }
})




module.exports = router;
