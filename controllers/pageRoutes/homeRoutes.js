/* eslint-disable new-cap */
// Import necessary modules
const router = require('express').Router();
const { Post } = require('../../models');

// Helper function for standardized error response
const errorResponse = (res, statusCode, message) => {
  return res.status(statusCode).json({ message });
};

// Get home page
router.get('/', async (req, res) => {
  try {
    // Fetch all posts without including related User and Comment data
    const postData = await Post.findAll({
      order: [['createdAt', 'DESC']],
    });

    // Serialize data so the template can read it
    const posts = postData.map((post) => post.get({ plain: true }));

    // Pass serialized data and session flag into template
    res.render('home', {
      posts,
      loggedIn: req.session ? req.session.loggedIn : false,
    });
  } catch (err) {
    // Log the error for debugging purposes
    console.error('Error in home route:', err);

    // Return an error response to the client
    errorResponse(res, 500, 'Failed to retrieve home page data');
  }
});

module.exports = router;
