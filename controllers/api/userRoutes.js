// eslint-disable-next-line new-cap
const router = require('express').Router();
const { User } = require('../../models');
const bcrypt = require('bcrypt');
const withAuth = require('../../utils/auth');

// Register a new user
router.post('/signup', async (req, res) => {
  try {
    const { username, password } = req.body;

    // Check if username and password are provided
    if (!username || !password) {
      return res
        .status(400)
        .json({ message: 'Username and password are required' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = await User.create({
      username,
      password: hashedPassword,
    });

    // Save user data in session
    req.session.save(() => {
      req.session.userId = newUser.id;
      req.session.username = newUser.username;
      req.session.loggedIn = true;

      res
        .status(200)
        .json({ user: newUser, message: 'Registration successful' });
    });
  } catch (err) {
    console.error('Error during user signup: ', err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// User login
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    // Check if username and password are provided
    if (!username || !password) {
      return res
        .status(400)
        .json({ message: 'Username and password are required' });
    }

    // Find user data by username
    const userData = await User.findOne({ where: { username } });

    // Check if user exists
    if (!userData) {
      return res
        .status(400)
        .json({ message: 'Incorrect username or password' });
    }

    // Compare passwords
    const validPassword = await bcrypt.compare(password, userData.password);

    // Check if password is valid
    if (!validPassword) {
      return res
        .status(400)
        .json({ message: 'Incorrect username or password' });
    }

    // Save user data in session
    req.session.save(() => {
      req.session.userId = userData.id;
      req.session.username = userData.username;
      req.session.loggedIn = true;

      res
        .status(200)
        .json({ user: userData, message: 'You are now logged in!' });
    });
  } catch (err) {
    console.error('Error during user login: ', err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Get all users
router.get('/', async (req, res) => {
  try {
    const userData = await User.findAll();
    res.status(200).json(userData);
  } catch (err) {
    console.error('Error fetching users: ', err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Update a user
router.put('/:id', withAuth, async (req, res) => {
  try {
    const userData = await User.update(req.body, {
      where: { id: req.params.id },
    });

    // Check if user was found and updated
    if (userData[0] === 0) {
      return res.status(404).json({ message: 'No user found with this id' });
    }
    res.status(200).json({ message: 'User updated successfully' });
  } catch (err) {
    console.error('Error updating user: ', err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Delete a user
router.delete('/:id', withAuth, async (req, res) => {
  try {
    const userData = await User.destroy({
      where: { id: req.params.id },
    });

    // Check if user was found and deleted
    if (!userData) {
      return res.status(404).json({ message: 'No user found with this id' });
    }
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (err) {
    console.error('Error deleting user: ', err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

module.exports = router;
