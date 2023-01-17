const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const pointSchema = require('./Point');
// https://mongoosejs.com/docs/geojson.html

const reactionSchema = new mongoose.Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  post: {
    type: Schema.Types.ObjectId,
    ref: 'Post'
  },
  reactionType: {
    type: String,
    enum: ['Reaction'],
    required: true
  },
});

module.exports = reactionSchema;
// export default reactionSchema;
// reuse with
// const citySchema = new mongoose.Schema({
//   name: String,
//   location: {
//     type: reactionSchema,
//     required: true
//   }
// });