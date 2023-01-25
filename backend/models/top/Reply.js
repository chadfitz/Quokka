const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const replySchema = new Schema({
  post: {
    type: Schema.Types.ObjectId,
    ref: 'Post'
  },

  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },

  body: {type: String}
});

module.exports = mongoose.model('Reply', replySchema);