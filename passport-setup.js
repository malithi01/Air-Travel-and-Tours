// const passport = require("passport");
// const GoogleStrategy = require("passport-google-oauth20").Strategy;
// const mongoose = require("mongoose");
// require("dotenv").config();

// const User = mongoose.model('User', new mongoose.Schema({
//     googleId: String,
//     displayName: String,
//     firstName: String,
//     lastName: String,
//     email: String,
//     profilePhoto: String
//   }));

//   passport.use(
//     new GoogleStrategy(
//       {
//         clientID: process.env.GOOGLE_CLIENT_ID,
//         clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//         callbackURL: process.env.GOOGLE_CALLBACK_URL,
//       },
//       async function (accessToken, refreshToken, profile, done) {
//         try {
//           // Check if user exists
//           let user = await User.findOne({ googleId: profile.id });
          
//           if (!user) {
//             // Create new user if doesn't exist
//             user = await User.create({
//               googleId: profile.id,
//               displayName: profile.displayName,
//               firstName: profile.name?.givenName,
//               lastName: profile.name?.familyName,
//               email: profile.emails?.[0]?.value,
//               profilePhoto: profile.photos?.[0]?.value
//             });
//           }
          
//           return done(null, user);
//         } catch (error) {
//           return done(error, null);
//         }
//       }
//     )
//   );

// // Serialize/Deserialize user
// // Serialize/Deserialize user
// passport.serializeUser((user, done) => {
//     done(null, user.id);
//   });
  
//   passport.deserializeUser(async (id, done) => {
//     try {
//       const user = await User.findById(id);
//       done(null, user);
//     } catch (error) {
//       done(error, null);
//     }
//   });


const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const mongoose = require("mongoose");
require("dotenv").config();

// Import the existing User model
const User = require("./models/userModel");  // Adjust path as necessary

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
    },
    async function (accessToken, refreshToken, profile, done) {
      try {
        // Check if user exists
        let user = await User.findOne({ googleId: profile.id });

        if (!user) {
          // Create new user if doesn't exist
          user = await User.create({
            googleId: profile.id,
            displayName: profile.displayName,
            firstName: profile.name?.givenName,
            lastName: profile.name?.familyName,
            email: profile.emails?.[0]?.value,
            profilePhoto: profile.photos?.[0]?.value,
          });
        }

        return done(null, user);
      } catch (error) {
        return done(error, null);
      }
    }
  )
);

// Serialize/Deserialize user
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

