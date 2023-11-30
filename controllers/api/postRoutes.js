/* eslint-disable prettier/prettier */
// eslint-disable-next-line new-cap
// Import necessary modules
// eslint-disable-next-line new-cap
const router = require('express').Router();
const { Post } = require('../../models');
const withAuth = require('../../utils/auth');

// Create a new post
router.post('/', withAuth, async (req, res) => {
  try {
    // Get title and content from request body
    const { title, content } = req.body;
    // Check if title and content are provided
    if (!title || !content) {
      return res
        .status(400)
        .json({ message: 'Title and content are required' });
    }

    // Create a new post with the provided data
    const newPost = await Post.create({
      ...req.body,
      userId: req.session.userId,
    });
    // Return the newly created post
    res.status(200).json(newPost);
  } catch (err) {
    console.error('Error creating post: ', err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Update an existing post
router.put('/:id', withAuth, async (req, res) => {
  try {
    // Update the post with the provided data
    const [affectedRows] = await Post.update(req.body, {
      where: {
        id: req.params.id,
        userId: req.session.userId,
      },
    });

    // Check if the post was updated successfully
    if (affectedRows === 0) {
      return res
        .status(404)
        .json({ message: 'No post found with this id or unauthorized' });
    }
    // Return success message
    res.status(200).json({ message: 'Post updated successfully' });
  } catch (err) {
    console.error('Error updating post: ', err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Delete a post
router.delete('/:id', withAuth, async (req, res) => {
  try {
    // Delete the post with the provided id and user id
    const deletedRows = await Post.destroy({
      where: {
        id: req.params.id,
        userId: req.session.userId,
      },
    });

    // Check if the post was deleted successfully
    if (deletedRows === 0) {
      return res
        .status(404)
        .json({ message: 'No post found with this id or unauthorized' });
    }
    // Return success message
    res.status(200).json({ message: 'Post deleted successfully' });
  } catch (err) {
    console.error('Error deleting post: ', err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Get all posts
router.get('/', async (req, res) => {
  try {
    // Retrieve all posts
    const postData = await Post.findAll();
    // Return the retrieved posts
    res.status(200).json(postData);
  } catch (err) {
    console.error('Error retrieving posts: ', err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Export the router
module.exports = router;
