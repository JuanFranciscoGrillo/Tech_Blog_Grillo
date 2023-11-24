const router = require('express').Router();
const { User } = require('../../models');
const bcrypt = require('bcrypt');

// Helper function for standardized error response
const errorResponse = (res, statusCode, message) => {
  return res.status(statusCode).json({ message });
};

// Route to register a new user
router.post('/signup', async (req, res) => {
  try {
    // Basic data validation
    if (!req.body.username || !req.body.password) {
      return errorResponse(res, 400, 'Username and password are required');
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const newUser = await User.create({
      username: req.body.username,
      password: hashedPassword,
    });

    req.session.save(() => {
      req.session.userId = newUser.id;
      req.session.username = newUser.username;
      req.session.loggedIn = true;

      res
        .status(200)
        .json({ user: newUser, message: 'Registration successful' });
    });
  } catch (err) {
    errorResponse(res, 500, 'Failed to register user');
  }
});

// Route for user login
router.post('/login', async (req, res) => {
  try {
    const userData = await User.findOne({
      where: { username: req.body.username },
    });
    if (!userData) {
      return errorResponse(
        res,
        400,
        'Incorrect username or password, please try again'
      );
    }

    const validPassword = await bcrypt.compare(
      req.body.password,
      userData.password
    );
    if (!validPassword) {
      return errorResponse(
        res,
        400,
        'Incorrect username or password, please try again'
      );
    }

    req.session.save(() => {
      req.session.userId = userData.id;
      req.session.username = userData.username;
      req.session.loggedIn = true;

      res
        .status(200)
        .json({ user: userData, message: 'You are now logged in!' });
    });
  } catch (err) {
    errorResponse(res, 500, 'Failed to login');
  }
});

// Read operation - Get all users
router.get('/', async (req, res) => {
  try {
    const userData = await User.findAll();
    res.status(200).json(userData);
  } catch (err) {
    errorResponse(res, 500, 'Failed to retrieve users');
  }
});

// Update operation - Update a user
router.put('/:id', async (req, res) => {
  try {
    const userData = await User.update(req.body, {
      where: { id: req.params.id },
    });

    if (userData[0] === 0) {
      return errorResponse(res, 404, 'No user found with this id');
    }
    res.json({ message: 'User updated successfully' });
  } catch (err) {
    errorResponse(res, 500, 'Failed to update user');
  }
});

// Delete operation - Delete a user
router.delete('/:id', async (req, res) => {
  try {
    const userData = await User.destroy({
      where: { id: req.params.id },
    });

    if (!userData) {
      return errorResponse(res, 404, 'No user found with this id');
    }
    res.json({ message: 'User deleted successfully' });
  } catch (err) {
    errorResponse(res, 500, 'Failed to delete user');
  }
});

module.exports = router;
