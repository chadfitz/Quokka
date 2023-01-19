const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const User = mongoose.model('User');
const Friend = mongoose.model('Friend');
const { requireUser } = require('../../config/passport');

router.post('/request/:recipientId', requireUser, async (req, res, next) => {
  // TODO: confirm that friendship does not already exist
  let relation;
  try {
    // const filter =
    relation = Friend.findOne({
      $or: [{ email: req.body.email }, { username: req.body.username }]
    });;
    // relation = await Friend.findOne(filter);
  } catch {

  }


  let friend;
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

  } catch(err) {

  }
})

















