const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const friendsSchema = Schema({
  requester: { type: Schema.Types.ObjectId, ref: 'Users'},
  recipient: { type: Schema.Types.ObjectId, ref: 'Users'},
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
module.exports = mongoose.model('Friend', friendsSchema);