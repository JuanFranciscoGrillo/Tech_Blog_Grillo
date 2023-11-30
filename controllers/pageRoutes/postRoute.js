const express = require('express');
const router = express.Router(); // Create a router object
const { Post, User, Comment } = require('../../models'); // Adjust the path as needed
const { errorResponse } = require('../../utils/helpers'); // Adjust the path as needed

// Add your route handler here
router.get('/post/:postId', async (req, res) => {
  try {
    // Find the post by its ID and include the associated user and comments
    const post = await Post.findByPk(req.params.postId, {
      include: [User, { model: Comment, include: [User] }],
    });

    // If the post exists, render the 'post' view with the post data and logged-in status
    if (post) {
      res.render('post', {
        post: post.get({ plain: true }),
        loggedIn: req.session.loggedIn,
      });
    } else {
      // If the post does not exist, send a 404 status and a message
      res.status(404).send('Post not found');
    }
  } catch (err) {
    // If an error occurs, send a 500 status and an error message
    errorResponse(res, 500, 'Failed to retrieve post data');
  }
});

// Export the router object
module.exports = router;
