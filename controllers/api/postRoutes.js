const router = require('express').Router();
const { Post } = require('../../models');
const withAuth = require('../../utils/auth'); // Add your authentication middleware if needed

// Route to create a new post
router.post('/', withAuth, async (req, res) => {
    // Implement logic to create a post
    try {
        const newPost = await Post.create({
            ...req.body,
            userId: req.session.userId,
        });
        res.status(200).json(newPost);
    } catch (err) {
        res.status(400).json(err);
    }
});

// PUT route to update an existing post
router.put('/:id', withAuth, async (req, res) => {
    try {
        const updatedPost = await Post.update(req.body, {
            where: {
                id: req.params.id,
                userId: req.session.userId,
            },
        });
        if (!updatedPost) {
            res.status(404).json({ message: 'No post found with this id!' });
            return;
        }
        res.json(updatedPost);
    } catch (err) {
        res.status(500).json(err);
    }
});

// DELETE route to delete a post
router.delete('/:id', withAuth, async (req, res) => {
    try {
        const postData = await Post.destroy({
            where: {
                id: req.params.id,
                userId: req.session.userId,
            },
        });
        if (!postData) {
            res.status(404).json({ message: 'No post found with this id!' });
            return;
        }
        res.json(postData);
    } catch (err) {
        res.status(500).json(err);
    }
});

// Read operation - Get all posts
router.get('/', async (req, res) => {
    try {
        const postData = await Post.findAll();
        res.status(200).json(postData);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
