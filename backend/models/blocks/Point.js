// https://mongoosejs.com/docs/geojson.html

const pointSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['Point'],
    required: true
  },
  coordinates: {
    type: [Number],
    required: true
  }
});

export default pointSchema;
// reuse with
// const citySchema = new mongoose.Schema({
//   name: String,
//   location: {
//     type: pointSchema,
//     required: true
//   }
// });