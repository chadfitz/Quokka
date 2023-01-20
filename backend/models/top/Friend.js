const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const friendSchema = new Schema({
  // father: { type: Number , default: 0},
  requester: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  recipient: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  relation: {
    type: Number,
    enums: [
      // 0 reserved to avoid falsy challenges later
      1, // add friend
      2, // awaiting confirmation
      3, // friends
    ]
  }
});

// // const Friend = mongoose.model('Friend', friendsSchema);
// // module.exports = Friend;
module.exports = mongoose.model('Friend', friendSchema);