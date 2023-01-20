const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const replySchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },

  reaction: String
})