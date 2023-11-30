// controllers/api/index.js

// Import the necessary modules
const express = require('express');
// eslint-disable-next-line new-cap
const router = express.Router(); // Declare the 'router' variable using the express.Router() method

// Import the required route files
const userRoutes = require('./userRoutes');
const postRoutes = require('./postRoutes');
const commentRoutes = require('./commentRoutes');

// Use the imported route files
router.use('/users', userRoutes);
router.use('/posts', postRoutes);
router.use('/comments', commentRoutes);

// Export the router
module.exports = router;
