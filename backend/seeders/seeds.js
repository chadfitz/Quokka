const mongoose = require("mongoose");
const { mongoURI: db } = require('../config/keys.js');
const User = require('../models/top/User');
const Post = require('../models/top/Post');
const bcrypt = require('bcryptjs');
const { faker } = require('@faker-js/faker');

const NUM_SEED_USERS = 10;
const NUM_SEED_POSTS = 30;

// Create users
const users = [];

users.push(
  new User ({
    // username: 'demo-user',
    // email: 'demo-user@appacademy.io',
    // hashedPassword: bcrypt.hashSync('starwars', 10)
  })
)

// for (let i = 1; i < NUM_SEED_USERS; i++) {
//   const firstName = faker.name.firstName();
//   const lastName = faker.name.lastName();
//   users.push(
//     new User ({
//       username: faker.internet.userName(firstName, lastName),
//       email: faker.internet.email(firstName, lastName),
//       hashedPassword: bcrypt.hashSync(faker.internet.password(), 10),
//     })
//   )
// }

// // Create posts
// const posts = [];

// for (let i = 0; i < NUM_SEED_POSTS; i++) {
//   posts.push(
//     new Post ({
//       text: faker.hacker.phrase(),
//       author: users[Math.floor(Math.random() * NUM_SEED_USERS)]._id

//     })
//   )
// }



// Connect to database
mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => {
    console.log('Connected to MongoDB successfully');
    insertSeeds();
  })
  .catch(err => {
    console.error(err.stack);
    process.exit(1);
  });

const insertSeeds = () => {
  console.log("Resetting db and seeding users and posts...");

  User.collection.drop()
                  .then(() => Post.collection.drop())
                  .then(() => User.insertMany(users))
                  .then(() => Post.insertMany(posts))
                  .then(() => {
                    console.log("Done!");
                    mongoose.disconnect();
                  })
                  .catch(err => {
                    console.error(err.stack);
                    process.exit(1);
                  });
}