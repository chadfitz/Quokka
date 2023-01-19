// source: https://stackoverflow.com/questions/50363220/modelling-for-friends-schema-in-mongoose
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const friendsSchema = new Schema({
  requester: { type: Schema.Types.ObjectId, ref: 'Users'},
  requester: { type: Schema.Types.ObjectId, ref: 'Users'},
  status: {
    type: Number,
    enums: [
      0, // add friend
      1, // requested
      2, // pending
      3, // friends
      4, // blocked
    ]
  }
});

module.exports = mongoose.model('Friends', friendsSchema);