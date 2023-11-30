// Import the required modules
const express = require('express');
// eslint-disable-next-line new-cap
const router = express.Router();

// Import the required routes
const dashboardRoutes = require('./dashboardRoutes');
const editPostRoute = require('./editPostRoute');
const homeRoutes = require('./homeRoutes');
const loginRoute = require('./loginRoute');
const postDetailRoute = require('./postRoute');
const signupRoute = require('./signupRoute');

// Use the imported routes
router.use(dashboardRoutes); // Use the dashboard routes
router.use(editPostRoute); // Use the edit post route
router.use(homeRoutes); // Use the home routes
router.use(loginRoute); // Use the login route
router.use(postDetailRoute); // Use the post detail route
router.use(signupRoute); // Use the signup route

module.exports = router; // Export the router for use in other files
