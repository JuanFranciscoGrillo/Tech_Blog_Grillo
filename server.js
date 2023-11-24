const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const morgan = require('morgan'); // For logging
require('dotenv').config(); // For loading environment variables

// Importing Sequelize instance from the connection configuration
const sequelize = require('./config/connection');
const helpers = require('./utils/helpers');

const app = express();
const PORT = process.env.PORT || 3000;

// Set up Handlebars.js engine with custom helpers
const hbs = exphbs.create({ helpers });
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// Middleware for logging
app.use(morgan('dev'));

// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// Set up session with Sequelize store
app.use(session({
  secret: process.env.SESSION_SECRET || 'Super secret secret',
  cookie: {
    maxAge: 3600000, // 1 hour for example
    httpOnly: true
  },
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
}));

// Import routes
const homeRoutes = require('./controllers/homeRoutes');
const dashboardRoutes = require('./controllers/dashboardRoutes');
const apiRoutes = require('./controllers/api');

// Use routes
app.use('/', homeRoutes);
app.use('/dashboard', dashboardRoutes);
app.use('/api', apiRoutes);

// Global error handling for unhandled routes
app.use((req, res, next) => {
  res.status(404).send("Sorry, can't find that!");
});

// Start the server and sync the database
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
