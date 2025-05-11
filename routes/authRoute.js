const express = require('express');
const passport = require('passport');

const router = express.Router();

// Start OAuth login
router.get('/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

// OAuth callback
router.get('/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  (req, res) => {
    res.redirect('/dashboard'); // Or your frontend URL
  }
);

// Logout
router.get('/logout', (req, res) => {
  req.logout(() => {
    res.redirect('/');
  });
});

module.exports = router;
