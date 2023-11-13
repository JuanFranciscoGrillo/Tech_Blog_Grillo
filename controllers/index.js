const express = require('express');
const router = express.Router();

// Import individual route controllers
const homeRoutes = require('./homeRoutes');
const dashboardRoutes = require('./dashboardRoutes');

// Use the imported route controllers
router.use('/', homeRoutes);
router.use('/dashboard', dashboardRoutes);

// Export the main router
module.exports = router;
