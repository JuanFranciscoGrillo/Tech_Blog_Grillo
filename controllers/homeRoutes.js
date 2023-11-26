const router = require('express').Router();
const { Post, User, Comment } = require('../models');

// Helper function for standardized error response
const errorResponse = (res, statusCode, message) => {
  return res.status(statusCode).json({ message });
};

// Get home page
router.get('/', async (req, res) => {
  try {
    // Fetch all posts and include related User and Comment data
    const postData = await Post.findAll({
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
      order: [['createdAt', 'DESC']], // Optionally add order to sort the posts
    });

    // Serialize data so the template can read it
    const posts = postData.map((post) => post.get({ plain: true }));

    // Pass serialized data and session flag into template
    res.render('home', { // Ensure this matches your Handlebars template file name
      posts,
      loggedIn: req.session ? req.session.loggedIn : false,
    });
  } catch (err) {
    errorResponse(res, 500, 'Failed to retrieve home page data');
  }
});

module.exports = router;
