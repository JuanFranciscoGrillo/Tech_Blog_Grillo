/* eslint-disable new-cap */
const express = require('express');
const router = express.Router(); // Create a router object

// Add route handlers
router.get('/login', (req, res) => {
  // Check if user is already logged in
  if (req.session.loggedIn) {
    // Redirect to dashboard if logged in
    res.redirect('/dashboard');
    return;
  }
  // Render login page if not logged in
  res.render('login');
});

router.post('/login', async (req, res) => {
  try {
    // Retrieve user input
    const { username, password } = req.body;

    // Find user in the database
    const user = await User.findOne({ where: { username } });
    if (!user) {
      // User not found, render login page with error message
      return res
        .status(401)
        .render('login', { error: 'Invalid username or password' });
    }

    // Check if the provided password matches the one in the database
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      // Password does not match, render login page with error message
      return res
        .status(401)
        .render('login', { error: 'Invalid username or password' });
    }

    // Set user information in the session
    req.session.loggedIn = true;
    req.session.userId = user.id;
    req.session.username = user.username;

    // Redirect to the dashboard or another page
    res.redirect('/dashboard');
  } catch (err) {
    // Handle errors
    console.error(err);
    res.status(500).render('login', { error: 'Internal server error' });
  }
});

// Export the router object
module.exports = router;
