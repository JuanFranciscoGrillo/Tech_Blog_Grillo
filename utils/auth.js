function withAuth(req, res, next) {
    // If the user is not logged in, redirect them to the login page
    if (!req.session.loggedIn) {
        res.redirect('/login');
    } else {
        // If the user is logged in, proceed with the next middleware
        next();
    }
}

module.exports = withAuth;
