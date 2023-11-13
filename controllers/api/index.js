// Import the Express framework and create a router
const express = require('express');
const router = express.Router();

// Import routes for users, posts, and comments
const userRoutes = require('./user-routes');
const postRoutes = require('./post-routes');
const commentRoutes = require('./comment-routes');

// Set up routes for each resource
router.use('/users', userRoutes);
router.use('/posts', postRoutes);
router.use('/comments', commentRoutes);

// Export the router for use in the application
module.exports = router;
