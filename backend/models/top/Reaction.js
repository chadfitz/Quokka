const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const reactionSchema = new Schema({
  postId: {
    type: Schema.Types.ObjectId,
    ref: 'Post'
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  body: String
});

module.exports = mongoose.model('Reaction', reactionSchema);
