const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const User = mongoose.model('User');
const Friend = mongoose.model('Friend');
const { requireUser } = require('../../config/passport');

router.post('/', async (req, res, next) => {
  console.log('in backend router addFriends');
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
    console.log(22);
    console.log('req.body');
    console.log(req.body);

    // if (existingRelation) throw new Error["Relation already exists"];

    console.log(26);


    const newFriend = new Friend({
      requester: req.body.requester,
      recipient: req.body.recipient,
      relation: 2
    })

    console.log(34);

    let entry = await newFriend.save();

    console.log('entry');
    console.log(entry);

    console.log(36);

    // entry = await entry.populate('name', '_id, username');
    // entry = await entry.populate('name', '_id, username');
    return res.json(entry);
  }
  catch (err) {
    const error = new Error("Add Friend Error");
    error.statusCode = 404;
    error.errors = { message: "backend routes | post('/addFriend')" };
    return next(error);
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














