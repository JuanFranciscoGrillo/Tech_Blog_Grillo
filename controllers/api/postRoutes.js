const router = require('express').Router();
const { Post } = require('../../models');
const withAuth = require('../../utils/auth'); // Middleware for authentication

// POST route to create a new post
router.post('/', withAuth, async (req, res) => {
    try {
        const newPost = await Post.create({
            ...req.body,
            userId: req.session.userId, // Assuming the user ID is stored in the session
        });
        res.status(200).json(newPost);
    } catch (err) {
        res.status(400).json(err);
    }
});

// PUT route to update an existing post
router.put('/:id', withAuth, async (req, res) => {
    try {
        const [affectedRows] = await Post.update(req.body, {
            where: {
                id: req.params.id,
                userId: req.session.userId, // Ensuring users can only update their posts
            },
        });
        if (affectedRows === 0) {
            res.status(404).json({ message: 'No post found with this id!' });
            return;
        }
        res.json({ message: 'Post updated successfully' });
    } catch (err) {
        res.status(500).json(err);
    }
});

// DELETE route to delete a post
router.delete('/:id', withAuth, async (req, res) => {
    try {
        const deletedRows = await Post.destroy({
            where: {
                id: req.params.id,
                userId: req.session.userId, // Ensuring users can only delete their posts
            },
        });
        if (deletedRows === 0) {
            res.status(404).json({ message: 'No post found with this id!' });
            return;
        }
        res.json({ message: 'Post deleted successfully' });
    } catch (err) {
        res.status(500).json(err);
    }
});

// GET route to read all posts
router.get('/', async (req, res) => {
    try {
        const postData = await Post.findAll();
        res.status(200).json(postData);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
