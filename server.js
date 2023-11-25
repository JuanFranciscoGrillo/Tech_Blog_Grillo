const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
require('dotenv').config(); // For loading environment variables

// Importing Sequelize instance and helpers
const sequelize = require('./config/connection');
const helpers = require('./utils/helpers');

const app = express();
const PORT = process.env.PORT || 3000;

// Set up Handlebars.js engine with custom helpers
const hbs = exphbs.create({ helpers });
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// Set up session with Sequelize store and cookie configuration
app.use(
  session({
    secret: process.env.SESSION_SECRET || 'default_secret',
    cookie: {
      maxAge: 3600000, // 1 hour for example
      httpOnly: true,
    },
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
      db: sequelize,
    }),
  })
);

// Import and use routes from the central controllers directory
const routes = require('./controllers');
app.use(routes);

// Global error handling for unhandled routes
app.use((req, res, next) => {
  res.status(404).send("Sorry, can't find that!");
});

// Sync sequelize models to the database, then start the server with error handling
sequelize
  .sync({ force: false })
  .then(() => {
    app.listen(PORT, () =>
      console.log(`Server is running on http://localhost:${PORT}`)
    );
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });

module.exports = app;
