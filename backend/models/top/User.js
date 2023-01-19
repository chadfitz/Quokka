const pointSchema = require('../blocks/Point')
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  // auth
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  hashedPassword: {
    type: String,
    required: true
  },
  // mapping friends, etc.
  location: {
    type: pointSchema
    // required: true
  },
  // profile customization
  profileImageUrl: {
    type: String
    // required: true
  },
  friends: [{
    type: Schema.Types.ObjectId,
    ref: 'Friends'
  }],
  backgroundColor: {
    type: String
  },
  primaryColor: {
    type: String
  },
  textColor: {
    type: String
  },
  bio: {
    type: String
  },
  age: {
    type: Number
  },
  gender: {
    type: String
  }
}, {
  timestamps: true
});

// export default

module.exports = mongoose.model('User', userSchema);
