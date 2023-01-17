const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// https://mongoosejs.com/docs/geojson.html

const pointSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['Point'],
    required: true
  },
  coordinates: {
    type: [Number], // longitude & latitude
    required: true
  }
});

module.exports = pointSchema;
// export {pointSchema};
// module.exports = mongoose.model('Point', pointSchema);


// reuse with
// const citySchema = new mongoose.Schema({
//   name: String,
//   location: {
//     type: pointSchema,
//     required: true
//   }
// });