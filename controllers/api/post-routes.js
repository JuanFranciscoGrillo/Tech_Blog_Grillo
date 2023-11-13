// Import necessary modules and models
const router = require('express').Router();
const { Post, User, Comment } = require('../../models');

// Middleware for authentication
const isAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    res.status(401).json({ error: 'Not authenticated' });
};

// Get All Posts for Homepage
router.get('/', async (req, res) => {
    try {
        const postData = await Post.findAll({
            include: [User],
            order: [['createdAt', 'DESC']]
        });
        res.json({ data: postData });
    } catch (err) {
        console.error("Error fetching all posts: ", err);
        res.status(500).json({ error: 'Error fetching all posts' });
    }
});

// Get Specific Post with Comments
router.get('/:id', async (req, res) => {
    try {
        const postData = await Post.findOne({
            where: { id: req.params.id },
            include: [User, {
                model: Comment,
                include: [User]
            }]
        });

        if (!postData) {
            return res.status(404).json({ error: 'Post not found' });
        }

        res.json({ data: postData });
    } catch (err) {
        console.error("Error fetching specific post: ", err);
        res.status(500).json({ error: 'Error fetching post details' });
    }
});

// Create a New Post
router.post('/', isAuthenticated, async (req, res) => {
    try {
        const { title, content, userId } = req.body;

        if (!title || !content || !userId) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        const newPost = await Post.create({ title, content, userId });
        res.status(200).json({ data: newPost });
    } catch (err) {
        console.error("Error creating post: ", err);
        res.status(400).json({ error: 'Error creating new post' });
    }
});

// Update an Existing Post
router.put('/:id', isAuthenticated, async (req, res) => {
    try {
        const { title, content, userId } = req.body;

        if (!title || !content || !userId) {
            return res.status(400).json({ error: 'All fields are required for updating' });
        }

        const updatedPost = await Post.update({ title, content, userId }, {
            where: { id: req.params.id }
        });

        if (updatedPost[0] === 0) {
            return res.status(404).json({ error: 'Post not found' });
        }

        res.json({ data: updatedPost });
    } catch (err) {
        console.error("Error updating post: ", err);
        res.status(500).json({ error: 'Error updating post' });
    }
});

// Delete a Post
router.delete('/:id', isAuthenticated, async (req, res) => {
    try {
        const deletedPost = await Post.destroy({
            where: { id: req.params.id }
        });

        if (!deletedPost) {
            return res.status(404).json({ error: 'Post not found' });
        }

        res.status(204).end();
    } catch (err) {
        console.error("Error deleting post: ", err);
        res.status(500).json({ error: 'Error deleting post' });
    }
});

// Export the router for use in the application
module.exports = router;
