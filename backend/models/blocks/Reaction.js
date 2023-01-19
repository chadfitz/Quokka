const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const pointSchema = require('./Point');
// https://mongoosejs.com/docs/geojson.html

const reactionSchema = new Schema({
  // The user who reacts to a post
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  //
  emotions: [String]
});


// "Pasta is great"
    // reactions
        // JOHN
          // ['LOL', 'ANGRY']

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
