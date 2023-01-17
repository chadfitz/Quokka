const mongoose = require("mongoose");
const { mongoURI: db } = require('../config/keys.js');
const User = require('../models/top/User');
const Post = require('../models/top/Post');

const DEFAULT_PROFILE_IMAGE_URL = 'YOUR-URL-HERE'; // <- Insert the S3 URL that you copied above here

// Connect to database
mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => {
    console.log('Connected to MongoDB successfully');
    initializeImages();
  })
  .catch(err => {
    console.error(err.stack);
    process.exit(1);
  });

// Initialize image fields in db
const initializeImages = async () => {
  console.log("Initializing profile avatars...");
  await User.updateMany({}, { profileImageUrl: DEFAULT_PROFILE_IMAGE_URL });

  console.log("Initializing Post image URLs...");
  await Post.updateMany({}, { imageUrls: [] });

  console.log("Done!");
  mongoose.disconnect();
}