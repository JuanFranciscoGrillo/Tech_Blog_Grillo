/* eslint-disable prettier/prettier */
// eslint-disable-next-line new-cap
const router = require('express').Router();
const { Post } = require('../../models');
const withAuth = require('../../utils/auth');

// Create a new post
router.post('/', withAuth, async (req, res) => {
  try {
    const { title, content } = req.body;
    if (!title || !content) {
      return res
        .status(400)
        .json({ message: 'Title and content are required' });
    }

    const newPost = await Post.create({
      ...req.body,
      userId: req.session.userId,
    });
    res.status(200).json(newPost);
  } catch (err) {
    console.error('Error creating post: ', err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Update an existing post
router.put('/:id', withAuth, async (req, res) => {
  try {
    const [affectedRows] = await Post.update(req.body, {
      where: {
        id: req.params.id,
        userId: req.session.userId,
      },
    });

    if (affectedRows === 0) {
      return res.status(404).json({ message: 'No post found with this id or unauthorized' });
    }
    res.status(200).json({ message: 'Post updated successfully' });
  } catch (err) {
    console.error('Error updating post: ', err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Delete a post
router.delete('/:id', withAuth, async (req, res) => {
  try {
    const deletedRows = await Post.destroy({
      where: {
        id: req.params.id,
        userId: req.session.userId,
      },
    });

    if (deletedRows === 0) {
      return res.status(404).json({ message: 'No post found with this id or unauthorized' });
    }
    res.status(200).json({ message: 'Post deleted successfully' });
  } catch (err) {
    console.error('Error deleting post: ', err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Get all posts
router.get('/', async (req, res) => {
  try {
    const postData = await Post.findAll();
    res.status(200).json(postData);
  } catch (err) {
    console.error('Error retrieving posts: ', err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

module.exports = router;
