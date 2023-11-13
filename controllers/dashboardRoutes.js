const router = require('express').Router();
const { Post, User, Comment } = require('../models');
const withAuth = require('../utils/auth'); // Replace with your actual authentication middleware

// Get dashboard page
router.get('/', withAuth, async (req, res) => {
    try {
        // Fetch posts specific to the logged-in user
        const userPosts = await Post.findAll({
            where: {
                userId: req.session.userId // Assuming the session contains the user's ID
            },
            include: [
                {
                    model: User,
                    attributes: ['username']
                },
                {
                    model: Comment,
                    attributes: ['content', 'createdAt'], // Assuming the field is 'content'
                    include: {
                        model: User,
                        attributes: ['username']
                    }
                }
            ]
        });

        // Serialize data so the template can read it
        const posts = userPosts.map(post => post.get({ plain: true }));

        // Render the dashboard page with the user's posts
        res.render('dashboard', { // Replace 'dashboard' with your actual dashboard view file
            posts,
            loggedIn: req.session.loggedIn // Assuming you track login status in the session
        });
    } catch (err) {
        // Handle errors and respond with an error message
        res.status(500).send(err);
    }
});

module.exports = router;
