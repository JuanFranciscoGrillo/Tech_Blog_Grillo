const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth'); // Middleware for authentication

// Helper function for standardized error response
const errorResponse = (res, statusCode, message) => {
    return res.status(statusCode).json({ message });
};

// Route to create a new comment
router.post('/', withAuth, async (req, res) => {
    try {
        // Data validation (simple example)
        if (!req.body.text) {
            return errorResponse(res, 400, 'Comment text is required');
        }

        const newComment = await Comment.create({
            ...req.body,
            userId: req.session.userId,
        });
        res.json(newComment);
    } catch (err) {
        errorResponse(res, 400, err.toString());
    }
});

// Read operation - Get all comments
router.get('/', async (req, res) => {
    try {
        const commentData = await Comment.findAll();
        res.status(200).json(commentData);
    } catch (err) {
        errorResponse(res, 500, 'Failed to retrieve comments');
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
            return errorResponse(res, 404, 'No comment found with this id or unauthorized');
        }
        res.json({ message: 'Comment updated successfully' });
    } catch (err) {
        errorResponse(res, 500, 'Failed to update comment');
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
            return errorResponse(res, 404, 'No comment found with this id or unauthorized');
        }
        res.json({ message: 'Comment deleted successfully' });
    } catch (err) {
        errorResponse(res, 500, 'Failed to delete comment');
    }
});

module.exports = router;
