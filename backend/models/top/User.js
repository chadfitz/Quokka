const pointSchema = require('../blocks/Point')
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = Schema({
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
    type: pointSchema,
    required: true
  },
  // profile customization
  profileImageUrl: {
    type: String,
    required: true
  },
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
  // Question: Why do we need info between these lines?
  age: {
    type: String
  },
  gender: {
    type: String
  }
  // Question end
}, {
  timestamps: true
});

// export default

module.exports = mongoose.model('User', userSchema);