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

    const nonFriendsArray = await User.find({
      '_id': { $nin: friendIds }
    });

    // var arr = [{key:"11", value:"1100"},{key:"22", value:"2200"}];
    // const friendsObject = friendsArray.reduce(
    //   (obj, item) => Object.assign(obj, { [item.key]: item.value }), {}
    // );

    console.log('friendsArray');
    console.log(friendsArray);
    console.log('nonFriendsArray');
    console.log(nonFriendsArray);

    const friendsObject = friendsArray.reduce((obj, item) => (obj[item._id] = item, obj) , {});
    // const nonFriendsObject = nonFriendsArray.reduce((obj, item) => (obj[item._id] = item, obj) ,{})

    // let friends = {};
    // friendIds.forEach(async friendId => {
    //   console.log('friendId');
    //   console.log(friendId);
    //   let friend = await User.findById(friendId.toString());
    //   console.log('friend');
    //   console.log(friend);
    //   friends[friendId] = friend;
    //   console.log('friends');
    //   console.log(friends);
    // });

    console.log('friends');
    console.log(friendsObject);
    // const res = await friends.json();
    // var object2 = friendObjects;
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
    console.log('in err');
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
    console.log('deleting relation 1');
    deletedFriend = await relation1.delete();
    return res.status(200).json(deletedFriend);
  } else if (relation2) {
    console.log('deleting relation 2');
    deletedFriend = await relation2.delete();
    return res.status(200).json(deletedFriend);
  } else {
    throw new Error("Friend not found");
  }
});



/*
router.post('/acceptFriend', requireUser, async (req, res, next) => {
  // TODO: confirm that friendship does not already exist
  try {
    // const filter =
    let relation1 = await Friend.findOne({
      $and: [{ requester: req.body.requester }, { recipient: req.body.recipient }]
    });
    let relation2 = await Friend.findOne({
      $and: [{ recipient: req.body.requester }, { requester: req.body.recipient }]
    });

    // TODO: add && relationtype here or in search
    if (relation1) {
      await relation1.update({relation: 3})
    } else if (relation2) {
      await relation2.update({relation: 3})
    } else {
      throw new Error("Friend request not found");
    }
  } catch(err) {
    const error = new Error("Relation Create Error");
    error.statusCode = 404;
    error.errors = { message: "backend routes | post('/addFriend')" };
    return next(error);
  }
})
*/

// TODO: DELETE
  // let friend;
  // try {
  //   const docA = await Friend.findOneAndUpdate(
  //     { requester: UserA, recipient: UserB },
  //     { $set: { status: 1 }},
  //     { upsert: true, new: true}
  //   );
  //   const docB = await Friend.findOneAndUpdate(
  //     { requester: UserA, recipient: UserB },
  //     { $set: { status: 2 }},
  //     { upsert: true, new: true}
  //   );
  //   const updateUserA = await User.findOneAndUpdate(
  //     { _id: UserA },
  //     { $push: { friends: docA._id }}
  //   );
  //   const updateUserB = await User.findOneAndUpdate(
  //     { _id: UserB },
  //     { $push: { friends: docB._id }}
  //   );



module.exports = router;














