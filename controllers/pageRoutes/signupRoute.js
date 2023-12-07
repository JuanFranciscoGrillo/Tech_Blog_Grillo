/* eslint-disable new-cap */
// Import necessary modules
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const { User } = require('../../models'); // Updated import path

// Handle GET request for '/signup' route
router.get('/signup', (req, res) => {
  // Check if user is already logged in
  if (req.session.loggedIn) {
    // Redirect to dashboard if already logged in
    res.redirect('/dashboard');
    return;
  }
  // Render the signup page
  res.render('signup');
});

// Handle POST request for '/signup' route
router.post('/signup', async (req, res) => {
  try {
    // Retrieve user input
    const { username, password } = req.body;

    // Optional: Add input validation here

    // Check if user already exists
    const existingUser = await User.findOne({ where: { username } });
    if (existingUser) {
      // User already exists, render signup page with error message
      return res
        .status(400)
        .render('signup', { error: 'Username already taken' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = await User.create({
      username,
      password: hashedPassword,
    });

    // Set user information in the session
    req.session.loggedIn = true;
    req.session.userId = newUser.id;
    req.session.username = newUser.username;

    // Redirect to the dashboard or another page
    res.redirect('/dashboard');
  } catch (err) {
    // Handle errors
    console.error(err);
    res.status(500).render('signup', { error: 'Internal server error' });
  }
});

// Export the router
module.exports = router;
