// eslint-disable-next-line new-cap
const router = require('express').Router();
const { Comment } = require('../../models');

const withAuth = require('../../utils/auth');

// Create a new comment
router.post('/', withAuth, async (req, res) => {
  try {
    const { text } = req.body;

    // Check if comment text is provided
    if (!text) {
      return res.status(400).json({ message: 'Comment text is required' });
    }

    // Create a new comment
    const newComment = await Comment.create({
      text,
      userId: req.session.userId,
      // Add other necessary fields from req.body if needed
    });

    // Return the new comment
    res.status(200).json(newComment);
  } catch (err) {
    console.error('Error creating comment: ', err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Get all comments
router.get('/', async (req, res) => {
  try {
    // Retrieve all comments
    const commentData = await Comment.findAll();

    // Return the comment data
    res.status(200).json(commentData);
  } catch (err) {
    console.error('Error retrieving comments: ', err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Update a comment
router.put('/:id', withAuth, async (req, res) => {
  try {
    // Update the comment with the provided id and user id
    const commentData = await Comment.update(req.body, {
      where: {
        id: req.params.id,
        userId: req.session.userId,
      },
    });

    // Check if the comment was found and updated
    if (commentData[0] === 0) {
      return res
        .status(404)
        .json({ message: 'No comment found with this id or unauthorized' });
    }

    // Return success message
    res.status(200).json({ message: 'Comment updated successfully' });
  } catch (err) {
    console.error('Error updating comment: ', err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Delete a comment
router.delete('/:id', withAuth, async (req, res) => {
  try {
    // Delete the comment with the provided id and user id
    const commentData = await Comment.destroy({
      where: {
        id: req.params.id,
        userId: req.session.userId,
      },
    });

    // Check if the comment was found and deleted
    if (!commentData) {
      return res
        .status(404)
        .json({ message: 'No comment found with this id or unauthorized' });
    }

    // Return success message
    res.status(200).json({ message: 'Comment deleted successfully' });
  } catch (err) {
    console.error('Error deleting comment: ', err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

module.exports = router;
