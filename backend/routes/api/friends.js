const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = mongoose.model('User');
const Friend = mongoose.model('Friend');
const multer = require('multer');
const upload = multer();
const bcrypt = require('bcryptjs');
const { requireUser } = require('../../config/passport');
const { json } = require('express');
const ObjectUtil = require("../../util/ObjectUtil")


router.get('/:userId', async (req, res, next) => {
  try {
    let user = await User.findById(req.params.userId);;

    const friendObjects = await Friend.find({
      $or: [{ requester: user._id }, { recipient: user._id }]
    });

    const friendsFilter = friendObjects.map(friend => {
      return [friend.requester.toString(), friend.recipient.toString()];
    });

    const friendIds = friendsFilter.flat().filter( el => {
      return el.toString() !== user._id.toString();``
    })

    const friendsArray = await User.find({
      '_id': { $in: friendIds }
    });

    const friendsObject = friendsArray.reduce((obj, item) => (obj[item._id] = item, obj) , {});

    return res.json(friendsObject);
  } catch(err) {
    return res.status(404).json({ message: err.message });
  }
})

router.post('/', upload.none(), async (req, res, next) => {
  // const {requester, recipient, relation} = req
  try {
    let existingRelation = (
      await Friend.findOne({
        $and: [{ requester: req.body.requester }, { recipient: req.body.recipient }]
      })
      ||
      await Friend.findOne({
        $and: [{ recipient: req.body.requester }, { requester: req.body.recipient }]
      })
    );
    // QUESTION: is this right? what should i be doing instead?
    if (existingRelation) return {};
    const newFriend = new Friend({
      requester: req.body.requester,
      recipient: req.body.recipient,
      relation: req.body.relation
    })

    let entry = await newFriend.save();

    const friendUser = await User.findById(req.body.recipient);
    let friendObject = {[req.body.recipient]: friendUser};

    return res.json(friendObject);
  }
  catch (err) {
    err.statusCode = 404;
    return res.status(404).json({ message: err.message });
  }
});


router.delete('/:friendId', requireUser, async (req, res, next) => {
  const userId1 = req.user._id.toString();
  const userId2 = req.params.friendId;

  let relation1 = await Friend.findOne({
    $and: [{ requester: userId1 }, { recipient: userId2 }]
  });
  let relation2 = await Friend.findOne({
    $and: [{ recipient: userId1 }, { requester: userId2 }]
  });

  // TODO: add && relationtype here or in search
  let deletedFriend;
  if (relation1) {
    deletedFriend = await relation1.delete();
    return res.status(200).json(deletedFriend);
  } else if (relation2) {
    deletedFriend = await relation2.delete();
    return res.status(200).json(deletedFriend);
  } else {
    throw new Error("Friend not found");
  }
});


module.exports = router;














