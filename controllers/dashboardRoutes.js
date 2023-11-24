const router = require('express').Router();
const { Post, User, Comment } = require('../models');
const withAuth = require('../utils/auth'); // Replace with your actual authentication middleware

// Helper function for standardized error response
const errorResponse = (res, statusCode, message) => {
  return res.status(statusCode).json({ message });
};

// Get dashboard page
router.get('/', withAuth, async (req, res) => {
  try {
    // Ensure the user is logged in
    if (!req.session || !req.session.userId) {
      return errorResponse(
        res,
        401,
        'Unauthorized: No session or user ID found'
      );
    }

    // Fetch posts specific to the logged-in user
    const userPosts = await Post.findAll({
      where: { userId: req.session.userId },
      include: [
        {
          model: User,
          attributes: ['username'],
        },
        {
          model: Comment,
          attributes: ['content', 'createdAt'],
          include: {
            model: User,
            attributes: ['username'],
          },
        },
      ],
    });

    // Serialize data so the template can read it
    const posts = userPosts.map((post) => post.get({ plain: true }));

    // Render the dashboard page with the user's posts
    res.render('dashboard', {
      // Replace 'dashboard' with your actual dashboard view file
      posts,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    errorResponse(res, 500, 'Failed to retrieve dashboard data');
  }
});

module.exports = router;
