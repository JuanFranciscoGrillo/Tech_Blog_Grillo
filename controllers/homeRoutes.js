const router = require('express').Router();
const { Post, User, Comment } = require('../models');

// Get home page
router.get('/', async (req, res) => {
    try {
        // Fetch all posts and include related User and Comment data
        const postData = await Post.findAll({
            include: [
                {
                    model: User,
                    attributes: ['username'],
                },
                {
                    model: Comment,
                    attributes: ['content', 'createdAt'], // Assuming the field is 'content'
                    include: {
                        model: User,
                        attributes: ['username']
                    }
                }
            ],
            order: [['createdAt', 'DESC']] // Optionally add order to sort the posts
        });

        // Serialize data so the template can read it
        const posts = postData.map((post) => post.get({ plain: true }));

        // Pass serialized data and session flag into template
        res.render('homepage', { 
            posts, 
            loggedIn: req.session ? req.session.loggedIn : false // Check if session exists and if user is logged in
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
