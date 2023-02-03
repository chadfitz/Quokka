const mongoose = require("mongoose");
const { mongoURI: db } = require('../config/keys.js');
const User = require('../models/top/User');
const Post = require('../models/top/Post');
const Friend = require('../models/top/Friend');
const Reply = require('../models/top/Reply');
const Reaction = require('../models/top/Reaction');
const bcrypt = require('bcryptjs');
const { faker } = require('@faker-js/faker');
const { bulkSave } = require("../models/top/User");

const NUM_SEED_USERS = 10;
const NUM_SEED_POSTS = 10;
const NUM_SEED_FRIENDS = 4;
const NUM_SEED_REACTIONS = 27;

const users = []

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

users.push(
  new User ({
    username: 'Meera',
    email: 'meera@yahoo.com',
    hashedPassword: bcrypt.hashSync('password', 10),
    location: {
      "type" : "Point",
      "coordinates" : [
        -122.5,
        37.7
      ]
    },
    profileImageUrl: "https://quokka-pro.s3.us-west-2.amazonaws.com/public/profile1.png",
    backgroundColor: "blue",
    primaryColor: "purple",
    textColor: "black",
    bio: "free-spirited artist and traveler. Painting, sculpting and constantly seeking inspiration. Living life to the fullest and creating without limits.",
    age: 40,
    gender: "Female"
  })
)

users.push(
  new User ({
    username: 'Hugo',
    email: 'hugo@yahoo.com',
    hashedPassword: bcrypt.hashSync('password', 10),
    location: {
      "type" : "Point",
      "coordinates" : [
        -122.5,
        37.7
      ]
    },
    profileImageUrl: "https://quokka-pro.s3.us-west-2.amazonaws.com/public/profile2.png",
    backgroundColor: "blue",
    primaryColor: "purple",
    textColor: "black",
    bio: "Beer enthusiast and Soccer fanatic. Passionate about trying new brews and cheering on my favorite team. Life is too short to drink bad beer and support bad teams.",
    age: 33,
    gender: "Male"
  })
)

users.push(
  new User ({
    username: 'Antonio',
    email: 'antonio@yahoo.com',
    hashedPassword: bcrypt.hashSync('password', 10),
    location: {
      "type" : "Point",
      "coordinates" : [
        -122.5,
        37.7
      ]
    },
    profileImageUrl: "https://quokka-pro.s3.us-west-2.amazonaws.com/public/profile3.png",
    backgroundColor: "blue",
    primaryColor: "purple",
    textColor: "black",
    bio: "Equestrian and lover of the finer things. Passionate about horseback riding and living life to the fullest. Always on the lookout for new adventures and luxury experiences.",
    age: 63,
    gender: "Male"
  })
)

users.push(
  new User ({
    username: 'Vivian',
    email: 'vivian@yahoo.com',
    hashedPassword: bcrypt.hashSync('password', 10),
    location: {
      "type" : "Point",
      "coordinates" : [
        -122.5,
        37.7
      ]
    },
    profileImageUrl: "https://quokka-pro.s3.us-west-2.amazonaws.com/public/profile4.png",
    backgroundColor: "blue",
    primaryColor: "purple",
    textColor: "black",
    bio: "Traveler first! Gluten-free and always up for an adventure. Exploring new places and trying new foods. Living my best life, one gluten-free meal at a time.",
    age: 24,
    gender: "Female"
  })
)

users.push(
  new User ({
    username: 'Opie',
    email: 'opie@yahoo.com',
    hashedPassword: bcrypt.hashSync('password', 10),
    location: {
      "type" : "Point",
      "coordinates" : [
        -122.5,
        37.7
      ]
    },
    profileImageUrl: "https://quokka-pro.s3.us-west-2.amazonaws.com/public/profile5.png",
    backgroundColor: "blue",
    primaryColor: "purple",
    textColor: "black",
    bio: "Riding motorcycles, collecting tattoos, and loving my dog. Always looking for the next thrill and adventure. Life is too short to not have fun.",
    age: 45,
    gender: "Male"
  })
)

users.push(
  new User ({
    username: 'Alexis',
    email: 'alexis@yahoo.com',
    hashedPassword: bcrypt.hashSync('password', 10),
    location: {
      "type" : "Point",
      "coordinates" : [
        -122.5,
        37.7
      ]
    },
    profileImageUrl: "https://quokka-pro.s3.us-west-2.amazonaws.com/public/profile6.png",
    backgroundColor: "blue",
    primaryColor: "purple",
    textColor: "black",
    bio: "Lover of cats, piano and plants. Always surrounded by my feline friends, music and greenery. A happy heart is a full heart.",
    age: 22,
    gender: "Female"
  })
)

users.push(
  new User ({
    username: 'Sam',
    email: 'sam@yahoo.com',
    hashedPassword: bcrypt.hashSync('password', 10),
    location: {
      "type" : "Point",
      "coordinates" : [
        -122.5,
        37.7
      ]
    },
    profileImageUrl: "https://quokka-pro.s3.us-west-2.amazonaws.com/public/profile7.png",
    backgroundColor: "blue",
    primaryColor: "purple",
    textColor: "black",
    bio: "Jazz fanatic, anime enthusiast, and fashion lover. Always on the lookout for new music, shows and style inspiration. Living my best life, one tune, episode and outfit at a time.",
    age: 29,
    gender: "Male"
  })
)

users.push(
  new User ({
    username: 'Marcus',
    email: 'mark@yahoo.com',
    hashedPassword: bcrypt.hashSync('password', 10),
    location: {
      "type" : "Point",
      "coordinates" : [
        -122.5,
        37.7
      ]
    },
    profileImageUrl: "https://quokka-pro.s3.us-west-2.amazonaws.com/public/profile8.png",
    backgroundColor: "blue",
    primaryColor: "purple",
    textColor: "black",
    bio: "Exploring the great outdoors - hiking, camping, and all things nature.",
    age: 31,
    gender: "Male"
  })
)

users.push(
  new User ({
    username: 'Edith',
    email: 'edith@yahoo.com',
    hashedPassword: bcrypt.hashSync('password', 10),
    location: {
      "type" : "Point",
      "coordinates" : [
        -122.5,
        37.7
      ]
    },
    profileImageUrl: "https://quokka-pro.s3.us-west-2.amazonaws.com/public/profile9.png",
    backgroundColor: "blue",
    primaryColor: "purple",
    textColor: "black",
    bio: "Loving Jesus, spoiling my grandkids, and crafting cozy memories through knitting.",
    age: 68,
    gender: "Female"
  })
)

users.push(
  new User ({
    username: 'Tristan',
    email: 'tristan@yahoo.com',
    hashedPassword: bcrypt.hashSync('password', 10),
    location: {
      "type" : "Point",
      "coordinates" : [
        -122.5,
        37.7
      ]
    },
    profileImageUrl: "https://quokka-pro.s3.us-west-2.amazonaws.com/public/profile10.png",
    backgroundColor: "blue",
    primaryColor: "purple",
    textColor: "black",
    bio: "Enamored with a good book, cheering on my sports teams and spending time with my furry best friend Rhubarb.",
    age: 35,
    gender: "Male"
  })
)

// Create posts
const posts = [];
//different subjects
const subjects = ["Seeing the Pyramids", "Snorkeling with the turtles", "GOOD PIZZA, GOOD BEER", "Vin et visite de la Tour Eiffel", "Come on you Gunners",
            "The cutest animal in the world", "Once in a Lifetime", "Super Safari", "Incredible Nights and Food", "On top of the World"]

//different locations
const locations = [[32.67225666049477, 31.01805709841769], [21.39022587990223, -158.13741418220852], [41.88268393155588, -87.62339536116774],
 [48.85850419523782, 2.294449111568094], [51.555041908030454, -0.1084701883444511], [38.34986293910855, 145.35716315011166],
  [-63.55513899662103, -58.4164176183333], [26.328271354528884, 28.012616963341397], [13.758576678566724, 100.49302450591419],
 [-22.95166899825556, -43.21049793120693] ]
//different posts
const postsArray = ["<h1>What a time! </h1><p>I can't believe that it's already been <s>2</s> 3 years. </p><p><u>We have got to go back!</u></p><p>I miss you! Let's get together soon</p>",
                    "<h2>I can't stop thinking about snorkeling.</h2><p><strong>We got to see: </strong></p><ol><li><em>Sea Turtles</em></li><li><em>Humuhumunukunukuāpuaʻa</em></li><li><em>Dolphins</em></li><li><em>Whales</em></li><li><em>And my favorite, an Octopus</em></li></ol><p><br></p><p>There is so much more to explore. We have to go back!</p>",
                    "<p>What a trip, I guess we know why they call it the Windy City now!</p><p>I haven't stopped thinking about <a href='http://www.georgesdeepdish.com/' rel='noopener noreferrer' target='_blank'>George's Deep Dish</a>. Theres so much </p><p>more that I want to do!</p><h2>Next Time: </h2><ul><li>Go to a Cubs Game </li><li>See the Bean</li><li>Go to Crushed by Giants Brewing</li></ul><p><br></p><h1>Miss you tons!</h1>",
                    "<p>Do you remember when we first met? </p><h2>We were in Paris!!!</h2><p>I wish we could go back there was so much that we didn't get to do. </p><p>I want to see the Louvre and drink good wine!</p><p>Maybe for the time being we can just settle for getting together for some wine.</p>",
                    "<h1>It's our Year!</h1><p>Come on you gunners, 50 points at the halfway point and a win against Manchester United!</p><p class='ql-indent-1'><em>Oooh to, oooh to be,</em></p><p class='ql-indent-1'><em>Oooh to, oooh to be,</em></p><p class='ql-indent-1'><em>Oooh to, ooh to be,</em></p><p class='ql-indent-1'><em>Oooh to be a Goo-ner!</em></p><p><u>This is the YEAR.</u> Please, we have to see a game again soon!</p><p><br></p>",
                    "<p>Everyone says you should go to Australia for the Kangaroos.</p><h2>But THEY ARE WRONG!</h2><h1><u>Quokkas are the best animal ever</u></h1><p>Do you remember the one we named Antonio. I miss you </p><p>and Antonio dearly. We all need to get together soon. </p><p><br></p><p><br></p>",
                    "<p>Less than 0.005% of the global population has been to Antartica, </p><p><strong>BUT WE HAVE!</strong></p><p>I'm so glad that we got a chance to do that. I think one time was </p><p>probably enough for me, let's go somewhere warmer next time!</p><p><s>St. Kitts </s></p><p><strong><u>Nevis? </u></strong></p>",
                    "<p>I can't believe we both just happened to be in Africa at the same time together.</p><p><strong>Can we please get together soon? </strong></p><h1>I loved that trip!</h1><p>Give me a call soon so we can reminisce about the Safari!</p>",
                    "<p>I think of you every time I get Thai food. Do you remember how</p><p>good it was when we visited?!?!</p><ol><li>Tom Yum Goong</li><li>Pad Thai</li><li>Gaeng Keow Wan Gai&nbsp;</li><li>Tom Kha Gai</li><li>Kao Pad&nbsp;</li></ol><p><strong>Just typing that out made me hungry!</strong></p><p>Let's get together for some good food soon!</p>",
                    "<h2>The trip of a lifetime</h2><p>It was so beautiful there and that hike was breathtaking. </p><p><strong>Sorry, I was so slow up the mountain, but I think the view was worth the wait</strong>.</p><p>Hope all is well with you. You're in my thoughts often</p>",
                    ]

const imageUrlsArray = [ ["https://quokka-pro.s3.us-west-2.amazonaws.com/public/post-travel1.png", "https://quokka-pro.s3.us-west-2.amazonaws.com/public/post-travel2.png" ],
                         ["https://quokka-pro.s3.us-west-2.amazonaws.com/public/post-nature1.png", "https://quokka-pro.s3.us-west-2.amazonaws.com/public/post-nature2.png" ],
                         ["https://quokka-pro.s3.us-west-2.amazonaws.com/public/post-city1.png", "https://quokka-pro.s3.us-west-2.amazonaws.com/public/post-city2.png"],
                         ["https://quokka-pro.s3.us-west-2.amazonaws.com/public/post-france1.avif", "https://quokka-pro.s3.us-west-2.amazonaws.com/public/post-france2.png"],
                         ["https://quokka-pro.s3.us-west-2.amazonaws.com/public/post-london.png", "https://quokka-pro.s3.us-west-2.amazonaws.com/public/post-london2.png"],
                         ["https://quokka-pro.s3.us-west-2.amazonaws.com/public/post-quokka1.png", "https://quokka-pro.s3.us-west-2.amazonaws.com/public/post-quokka2.png"],
                         ["https://quokka-pro.s3.us-west-2.amazonaws.com/public/post-antartica1.png", "https://quokka-pro.s3.us-west-2.amazonaws.com/public/postantartica2.png"],
                         ["https://quokka-pro.s3.us-west-2.amazonaws.com/public/post-africa.png"],
                         ["https://quokka-pro.s3.us-west-2.amazonaws.com/public/post-bangkok.png", "https://quokka-pro.s3.us-west-2.amazonaws.com/public/post-bangkok2.png"],
                         ["https://quokka-pro.s3.us-west-2.amazonaws.com/public/post-brazil.png", "https://quokka-pro.s3.us-west-2.amazonaws.com/public/post-brazil2.png"]

]

const repliesArray = ["Great post!",
                      "Love this!",
                      "So true!",
                      "This made my day!",
                      "So glad to see this!",
                      "Absolutely!",
                      "You're amazing!",
                      "This is fantastic!",
                      "Love the positivity!",
                      "What a great message!",
                      "This is so inspiring!",
                      "This is exactly what I needed to hear!",
                      "Thanks for sharing this!",
                      "You rock!",
                      "This is amazing!",
                      "This is so important!",
                      "Love this post!",
                      "This is a such a good post!",
                      "So glad you shared this!",
                      "This is so powerful!",
                      "You're a star!",
                      "So proud of you!",
                      "This is so beautiful!",
                      "You're a blessing!",
                      "This is a must-read for everyone here!",
                      "You're amazing!",
                      "This is exactly what we need!",
                      "WOW!",
                      "You're a true inspiration!",
                      "So happy to see this!"
                      ]

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
          locations[i][1], // Longitude
          locations[i][0] // Latitude
        ]
      },
      subject: subjects[i],
      body: postsArray[i],
      imageUrls: imageUrlsArray[i]
    })
  )
}

const replies = [];
for (let i = 0; i < repliesArray.length; i++) {
  replies.push(
    new Reply ({
      post: posts[Math.floor(Math.random() * NUM_SEED_POSTS)]._id,
      user: users[Math.floor(Math.random() * NUM_SEED_USERS)]._id,
      body: repliesArray[Math.floor(Math.random() * repliesArray.length)]
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

const reactions = [];
const styles = ["happy", "hungry", "laughing", "love"];
for (let i = 0; i < NUM_SEED_REACTIONS; i++){
  reactions.push(new Reaction ({
    postId: posts[Math.floor(Math.random() * NUM_SEED_POSTS)]._id,
    userId: users[Math.floor(Math.random() * NUM_SEED_USERS)]._id,
    style: styles[Math.floor(Math.random() * styles.length)]
  }))
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
                  .then(() => Reply.collection.drop())
                  .then(() => Reaction.collection.drop())
                  .then(() => User.insertMany(users))
                  .then(() => Post.insertMany(posts))
                  .then(() => Reply.insertMany(replies))
                  .then(() => Reaction.insertMany(reactions))
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



