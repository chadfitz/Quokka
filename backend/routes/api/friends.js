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
    let user;
    user = await User.findById(req.params.userId);
    const friends = await Friend.find(
      { $or: [{ requester: user._id }, { recipient: user._id }] }
    );
    var object1 = friends.map(friend => [friend.requester, friend.recipient]);
    var object2 = object1.flat().filter( el => {
      return el.toString() !== user._id.toString();``
    })
    return res.json(object2)
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
    // QUESTION: is this right? what shouuld i be doing instead?
    if (existingRelation) return {};
    const newFriend = new Friend({
      requester: req.body.requester,
      recipient: req.body.recipient,
      relation: req.body.relation
    })

    let entry = await newFriend.save();

    // entry = await entry.populate('name', '_id, username');
    // entry = await entry.populate('name', '_id, username');
    return res.json(newFriend);
  }
  catch (err) {
    err.statusCode = 404;
    console.log('in err');
    return res.status(404).json({ message: err.message });
    // const error = new Error("Add Friend Error");
    // error.errors = { message: "backend routes | post('/addFriend')"};
    // return next(err);
  }
});


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













