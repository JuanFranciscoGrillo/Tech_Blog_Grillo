const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth'); // Middleware for authentication

// Route to create a new comment
router.post('/', withAuth, async (req, res) => {
    try {
        const newComment = await Comment.create({
            ...req.body,
            userId: req.session.userId,
        });
        res.json(newComment);
    } catch (err) {
        res.status(400).json(err);
    }
});

// Read operation - Get all comments
router.get('/', async (req, res) => {
    try {
        const commentData = await Comment.findAll();
        res.status(200).json(commentData);
    } catch (err) {
        res.status(500).json(err);
    }
});

// Update operation - Update a comment
router.put('/:id', withAuth, async (req, res) => {
    try {
        const commentData = await Comment.update(req.body, {
            where: {
                id: req.params.id,
                userId: req.session.userId // Assuming comments can only be edited by their authors
            }
        });
        if (commentData[0] === 0) {
            res.status(404).json({ message: 'No comment found with this id!' });
            return;
        }
        res.json(commentData);
    } catch (err) {
        res.status(500).json(err);
    }
});

// Delete operation - Delete a comment
router.delete('/:id', withAuth, async (req, res) => {
    try {
        const commentData = await Comment.destroy({
            where: {
                id: req.params.id,
                userId: req.session.userId // Assuming comments can only be deleted by their authors
            }
        });
        if (!commentData) {
            res.status(404).json({ message: 'No comment found with this id!' });
            return;
        }
        res.json({ message: 'Comment deleted successfully' });
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
