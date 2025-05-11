//import express
const express = require("express");

//import mongoose
const mongoose = require("mongoose");

//import bodyParser-json file format convert to java script obj
const bodyParser = require("body-parser");

//import cors
const cors = require("cors");

//import path
const path = require('path');


const app = express();


// // This will handle all routes and redirect to index.html
// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "build", "index.html"));
// });

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});

//import session ans passport
const session = require("express-session");
const passport = require("passport");

require("dotenv").config();
require("./passport-setup"); 


//import routes
const carRoute = require("./routes/carRoute");
const flightRoute = require("./routes/flightBooking");
const hotelRoute = require("./routes/hotelRoute");
const reviewsRoute = require("./routes/ratingsRoute");
const authRoute = require("./routes/authRoute");
const userRoutes = require('./routes/userRoute');


//app middleware
app.use(bodyParser.json());
// app.use(cors());
app.use(cors({
  origin: "http://localhost:3000", // Your React app's URL
  credentials: true,               // Allow cookies
}));

const cookieParser = require('cookie-parser');
app.use(cookieParser());

// app.use(
//   session({
//     secret: "travel_secret_key",
//     resave: false,
//     saveUninitialized: true,
//   })
// );
app.use(session({
  secret: process.env.SESSION_SECRET, 
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: false, // Set to true if using HTTPS
    maxAge: 24 * 60 * 60 * 1000 // 1 day
  }
}));
app.use(passport.initialize());
app.use(passport.session());

// Route to trigger Google login
// app.get(
//   "/auth/google",
//   passport.authenticate("google", { scope: ["profile", "email"] })
// );

// Callback URL Google will redirect to
// app.get(
//   "/auth/google/callback",
//   passport.authenticate("google", {
//     failureRedirect: "/auth/failure",
//   }),
//   (req, res) => {
//     // Create JWT or session token here if needed
//     // For simplicity, we'll just set a cookie with user info
//     res.cookie('user', JSON.stringify(req.user), { 
//       maxAge: 24 * 60 * 60 * 1000, // 24 hours
//       httpOnly: false // Make it accessible to frontend JavaScript
//     });
    
//     // Redirect to frontend
//     res.redirect(process.env.FRONTEND_URL || 'http://localhost:3000');
//   }
// );

// Add an endpoint to check authentication status
// app.get("/api/user", (req, res) => {
//   if (req.isAuthenticated()) {
//     res.json({
//       isAuthenticated: true,
//       user: req.user
//     });
//   } else {
//     res.json({
//       isAuthenticated: false
//     });
//   }
// });

// Add logout endpoint
// app.get("/api/logout", (req, res) => {
//   req.logout((err) => {
//     if (err) {
//       return res.status(500).json({ error: "Failed to logout" });
//     }
//     res.clearCookie('user');
//     res.json({ success: true });
//   });
// });

// app.get("/auth/success", (req, res) => {
//   res.send("Login successful");
// });

// app.get("/auth/failure", (req, res) => {
//   res.send("Login failed");
// });

//route middleware
app.use(carRoute);
app.use(flightRoute);
app.use(hotelRoute);
app.use(reviewsRoute);
app.use('/auth', authRoute);
app.use('/api/users', require('./routes/userRoute'));


// Serve static files from the React app
app.use(express.static(path.join(__dirname, "client", "build")));

// Catch-all to return React's index.html for unknown routes
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

//declaring server running port and creating DB connection
const PORT = 8000;
app.listen(PORT, () => {
  console.log(`App is running on ${PORT}`);
});

const DB_URL =
  "mongodb+srv://malithi01:travel01@airtravel.n87cr.mongodb.net/airTravel";

mongoose
  .connect(DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB connected");
  })
  .catch((err) => console.log("DB connection error", err));
