const router = require('express').Router();
const { Post } = require('../../models');
const withAuth = require('../../utils/auth'); // Middleware for authentication

// Helper function for standardized error response
const errorResponse = (res, statusCode, message) => {
  return res.status(statusCode).json({ message });
};

// POST route to create a new post
router.post('/', withAuth, async (req, res) => {
  try {
    // Basic data validation
    if (!req.body.title || !req.body.content) {
      return errorResponse(res, 400, 'Title and content are required');
    }

    const newPost = await Post.create({
      ...req.body,
      userId: req.session.userId,
    });
    res.status(200).json(newPost);
  } catch (err) {
    errorResponse(res, 400, 'Failed to create post');
  }
});

// PUT route to update an existing post
router.put('/:id', withAuth, async (req, res) => {
  try {
    const [affectedRows] = await Post.update(req.body, {
      where: {
        id: req.params.id,
        userId: req.session.userId,
      },
    });

    if (affectedRows === 0) {
      return errorResponse(
        res,
        404,
        'No post found with this id or unauthorized'
      );
    }
    res.json({ message: 'Post updated successfully' });
  } catch (err) {
    errorResponse(res, 500, 'Failed to update post');
  }
});

// DELETE route to delete a post
router.delete('/:id', withAuth, async (req, res) => {
  try {
    const deletedRows = await Post.destroy({
      where: {
        id: req.params.id,
        userId: req.session.userId,
      },
    });

    if (deletedRows === 0) {
      return errorResponse(
        res,
        404,
        'No post found with this id or unauthorized'
      );
    }
    res.json({ message: 'Post deleted successfully' });
  } catch (err) {
    errorResponse(res, 500, 'Failed to delete post');
  }
});

// GET route to read all posts
router.get('/', async (req, res) => {
  try {
    const postData = await Post.findAll();
    res.status(200).json(postData);
  } catch (err) {
    errorResponse(res, 500, 'Failed to retrieve posts');
  }
});

module.exports = router;
