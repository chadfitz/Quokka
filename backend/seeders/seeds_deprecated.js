const mongoose = require("mongoose");
const { mongoURI: db } = require('../config/keys.js');
const User = require('../models/top/User');
const Post = require('../models/top/Post');
const Friend = require('../models/top/Friend');
const bcrypt = require('bcryptjs');
const { faker } = require('@faker-js/faker');
const { bulkSave } = require("../models/top/User");

const NUM_SEED_USERS = 20;
const NUM_SEED_POSTS = 30;
const NUM_SEED_FRIENDS = 2;

// Create users
const users = [];

users.push(
  new User ({
    username: 'demo-user',
    email: 'demo-user@appacademy.io',
    hashedPassword: bcrypt.hashSync('starwars', 10),
    location: {
      "type" : "Point",
      "coordinates" : [
        -122.5,
        37.7
      ]
    },
    profileImageUrl: "http://t0.gstatic.com/licensed-image?q=tbn:ANd9GcQJ1Y27yyG3XtMj_ptfCOQai4XDeIK_5DI710Iog3UEk1fHwDV9-MGRIYE4J0Hqklfu9JVA-Cu6a_PbTbU",
    backgroundColor: "blue",
    primaryColor: "purple",
    textColor: "black",
    bio: "I AM DEMO DAN",
    age: 40,
    gender: "Demo"
  })
)

for (let i = 1; i < NUM_SEED_USERS; i++) {
  const firstName = faker.name.firstName();
  const lastName = faker.name.lastName();
  users.push(
    new User ({
      username: faker.internet.userName(firstName, lastName),
      email: faker.internet.email(firstName, lastName),
      hashedPassword: bcrypt.hashSync(faker.internet.password(), 10),
      location: {
        "type" : "Point",
        "coordinates" : [
          -122,
          37
        ]
      },
      profileImageUrl: "http://t0.gstatic.com/licensed-image?q=tbn:ANd9GcQJ1Y27yyG3XtMj_ptfCOQai4XDeIK_5DI710Iog3UEk1fHwDV9-MGRIYE4J0Hqklfu9JVA-Cu6a_PbTbU",
      backgroundColor: "red",
      primaryColor: "grey",
      textColor: "black",
      bio: "I AM NOT DEMO DAN",
      age: 30,
      gender: "Not Demo"
    })
  )
}

// Create posts
const posts = [];

// const longRange = [-122.52, -122.09];
// const latRange = [37.67, 37.83];``
const longRange = [-122.52, -120.09];
const latRange = [36.67, 38.83];

const randomPoint = (arr) => {
  const range = arr[1] - arr[0];
  return arr[0] + Math.random() * range;
}

for (let i = 0; i < NUM_SEED_POSTS; i++) {
  posts.push(
    new Post ({
      writer: users[Math.floor(Math.random() * NUM_SEED_USERS)]._id,
      recipient: users[Math.floor(Math.random() * NUM_SEED_USERS)]._id,
      location: {
        "type" : "Point",
        "coordinates" : [
          randomPoint(longRange), // Longitude
          randomPoint(latRange) // Latitude
        ]
      },
      subject: "this is the subject line",
      body: faker.hacker.phrase()
    })
  )
}

const friends = [];
for (let i = 0; i < NUM_SEED_FRIENDS; i++) {
  friends.push(new Friend ({
    requester: users[Math.floor(Math.random() * NUM_SEED_USERS)]._id,
    recipient: users[Math.floor(Math.random() * NUM_SEED_USERS)]._id,
    relation: 3
  }));
}


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
                  .then(() => Friend.collection.drop())
                  .then(() => User.insertMany(users))
                  .then(() => Post.insertMany(posts))
                  // .then(() => Friend.insertMany(friends))
                  .then(() => {
                    console.log("Done!");
                    mongoose.disconnect();
                  })
                  .catch(err => {
                    console.error(err.stack);
                    process.exit(1);
                  });
}
