// source: https://stackoverflow.com/questions/50363220/modelling-for-friends-schema-in-mongoose
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const friendsSchema = new Schema({
  requester: { type: Schema.Types.ObjectId, ref: 'Users'},
  recipient: { type: Schema.Types.ObjectId, ref: 'Users'},
  status: {
    type: Number,
    enums: [
      1, // add friend
      2, // requested
      3, // pending
      4, // friends
      5, // blocked
    ]
  }
});

// const Friend = mongoose.model('Friend', friendsSchema);
// module.exports = Friend;
module.exports = mongoose.model('Friend', friendsSchema);