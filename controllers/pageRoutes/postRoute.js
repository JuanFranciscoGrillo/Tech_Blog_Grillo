const express = require('express');
// eslint-disable-next-line new-cap
const router = express.Router();
const { Post, User, Comment } = require('../../models');
const { errorResponse } = require('../../utils/helpers');

// Route handler for getting a post by ID
router.get('/post/:postId', async (req, res, next) => {
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
      // If the post does not exist, throw a 404 error
      const error = new Error('Post not found');
      error.status = 404;
      throw error;
    }
  } catch (err) {
    // Pass the error to the error handling middleware
    next(err);
  }
});

// Error handling middleware
router.use((err, req, res, next) => {
  if (err.status === 404) {
    // Handle 404 errors with a custom response
    res.status(404).send('Post not found');
  } else {
    // Handle other errors with the errorResponse helper
    errorResponse(res, 500, 'Failed to retrieve post data');
  }
});

module.exports = router;
