const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const pointSchema = require('../blocks/Point');
const reactionSchema = require('../blocks/Reaction');
// import pointSchema from '../blocks/Point';
// import reactionSchema from '../blocks/Reaction';

const postSchema = Schema({
  writer: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  recipient: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  location: {
    type: pointSchema,
    required: true
  },
  // mongodb strings provided unlimited length
  subject: {
    type: String,
    required: true
  },
  body: {
    type: String,
    required: true
  },
  // AA method
  imageUrls: {
    type: [String],
    required: false
  },
  // Better way?
  // images: {
  //   type: Map,
  //   of: String
  // },
  reactions: {
    type: reactionSchema
  }
}, {
  timestamps: true
});

// to use our schema definition, we need to convert our blog schema into a Model we can work with
module.exports = mongoose.model('Post', postSchema);
// TODO: try with this line instead (latest syntax)
// export default Post = mongoose.model('Post', postSchema);