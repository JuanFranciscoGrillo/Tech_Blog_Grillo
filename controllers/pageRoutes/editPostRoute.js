// Import necessary modules and dependencies
// eslint-disable-next-line new-cap
const router = require('express').Router();
const { Post, User, Comment } = require('../../models');
const withAuth = require('../../utils/auth');

// Handle GET request to edit a post
router.get('/edit/:postId', withAuth, async (req, res) => {
  try {
    // Find the post by its ID and include the associated user and comments
    const post = await Post.findByPk(req.params.postId, {
      include: [User, Comment],
    });

    // If the post exists, render the editPost view with the post data and set loggedIn to true
    if (post) {
      res.render('editPost', {
        post: post.get({ plain: true }),
        loggedIn: true,
      });
    } else {
      // If the post does not exist, send a 404 status and display "Post not found"
      res.status(404).send('Post not found');
    }
  } catch (err) {
    // If there is an error, send a 500 status and display "Failed to retrieve post data"
    errorResponse(res, 500, 'Failed to retrieve post data');
  }
});

// Export the router
module.exports = router;
