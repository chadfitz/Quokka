const { json } = require('express');
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = mongoose.model('User');
const Post = mongoose.model('Post');
const { requireUser } = require('../../config/passport');
const validatePostInput = require('../../validations/posts');
const { multipleFilesUpload, multipleMulterUpload } = require("../../awsS3");


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
                              .populate("writer", "_id, username, profileImageUrl");
    return res.json(posts);
  }
  catch(err) {
    return res.json([]);
  }
})

router.get('/', async (req, res) => {
  const posts = await Post.find()
                          .populate("recipient", "_id, username")
                          .populate("writer", "_id, username profileImageUrl")
                          .sort({ createdAt: -1 });
  return res.json(posts);
});

router.delete('/:postId', async (req, res, next) => {
  const post = await Post.findById(req.params.postId)
  const deletedPost = await post.delete();
  return res.json(deletedPost);
});

// router.patch('/:postId', async (req, res, next) => {
//   try {
//     const filter = { _id: req.params.postId };
//     const update = { recipient: req.body.recipient,
//       location: req.body.location,
//       subject: req.body.subject,
//       body: req.body.body,
//       reactions: req.body.reactions,
//     }

//     const updatedPost = await Post.updateOne(filter, {
//       recipient: req.body.recipient,
//       location: req.body.location,
//       subject: req.body.subject,
//       body: req.body.body,
//       reactions: req.body.reactions,
//     }, function (err, docs) {
//         if (err){
//           console.log('updatedPost erorrrrrrrr');
//           console.log(err)
//         } else {
//           console.log("Updated Docs : ", docs);
//       }}
//     )
//   }

//   catch(err) {
//     const error = new Error('Post not found');
//     error.statusCode = 404;
//     error.errors = { message: "No post found with that id" };
//     return next(error);
//   }
// });

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
    const imageUrls = await multipleFilesUpload({ files: req.files, public: true });
    const updatedPost = await Post.updateOne({_id: req.params.id}, {
      location: JSON.parse(req.body.location),
      subject: req.body.subject,
      body: req.body.body,
      imageUrls
    })
    return res.json(updatedPost);
  }
  catch(err) {
    const error = new Error('Post not found');
    error.statusCode = 404;
    error.errors = { message: "No post found with that id" };
    return next(err);
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
