// Import necessary modules and dependencies
// eslint-disable-next-line new-cap
const router = require('express').Router();
const { Post, User, Comment } = require('../../models');
const withAuth = require('../../utils/auth');

// Route to retrieve dashboard data
router.get('/dashboard', withAuth, async (req, res) => {
  try {
    // Retrieve user's posts with associated user and comments
    const userPosts = await Post.findAll({
      where: { userId: req.session.userId },
      include: [User, Comment],
    });

    // Convert posts to plain objects
    const posts = userPosts.map((post) => post.get({ plain: true }));

    // Render dashboard view with posts and loggedIn status
    res.render('dashboard', { posts, loggedIn: true });
  } catch (err) {
    // Handle error if failed to retrieve dashboard data
    errorResponse(res, 500, 'Failed to retrieve dashboard data');
  }
});

// Export router
module.exports = router;
