const express = require('express');
// eslint-disable-next-line new-cap
const router = express.Router();

// Import individual routers
const userRoutes = require('./userRoutes');
const postRoutes = require('./postRoutes');
const commentRoutes = require('./commentRoutes');

// Use the imported routers
router.use('/users', userRoutes);
router.use('/posts', postRoutes);
router.use('/comments', commentRoutes);

module.exports = router;
