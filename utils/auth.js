/**
 * Middleware to protect routes that require authentication.
 * Redirects to login page if user is not logged in.
 *
 * @param {Object} req - The request object from Express.
 * @param {Object} res - The response object from Express.
 * @param {Function} next - The next middleware function in the stack.
 */
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
