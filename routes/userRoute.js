// const express = require('express');
// const router = express.Router();

// // Middleware to protect route
// const ensureAuth = (req, res, next) => {
//   if (req.isAuthenticated()) {
//     return next();
//   } else {
//     return res.status(401).json({ error: "Not authenticated" });
//   }
// };

// router.get('/userinfo', ensureAuth, (req, res) => {
//   res.json({ user: req.user });
// });

// module.exports = router;


const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/userModel');
const router = express.Router();
const passport = require('passport');


// Middleware to protect route
const ensureAuth = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  } else {
    return res.status(401).json({ error: 'Not authenticated' });
  }
};

// 1. Register Route (Create User)
router.post('/register', async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  try {
    // Check if the email already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ msg: 'User already exists' });
    }

    // Create new user
    const newUser = new User({
      firstName,
      lastName,
      email,
      password,
    });

    // Hash the password before saving
    await newUser.save();
    res.status(201).json({ msg: 'User registered successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
});

// 2. Login Route (User Authentication)
router.post('/login', passport.authenticate('local', {
  successRedirect: '/api/users/userinfo',
  failureRedirect: '/api/users/login',
  failureFlash: true
}));

// 3. Get User Info (Read User - Protected)
router.get('/userinfo', ensureAuth, (req, res) => {
  res.json({ user: req.user });
});

// 4. Update User Info (Update User)
router.put('/update', ensureAuth, async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  
  try {
    // Find the user by ID
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    // Update the fields
    if (firstName) user.firstName = firstName;
    if (lastName) user.lastName = lastName;
    if (email) user.email = email;
    if (password) {
      // Hash the new password before saving
      user.password = await bcrypt.hash(password, 10);
    }

    // Save the updated user
    await user.save();
    res.status(200).json({ msg: 'User updated successfully', user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
});

// 5. Delete User (Delete User)
router.delete('/delete', ensureAuth, async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.user.id);
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    res.status(200).json({ msg: 'User deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
});


module.exports = router;
