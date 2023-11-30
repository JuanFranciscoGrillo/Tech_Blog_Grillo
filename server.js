require('dotenv').config(); // Add this line at the top

const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const sequelize = require('./config/connection'); // Adjust the path as needed
const apiRoutes = require('./controllers/api'); // Adjust the path as needed
const pageRoutes = require('./controllers/pageRoutes'); // Adjust the path as needed

const app = express();
const PORT = process.env.PORT || 3000;

// Set up Handlebars.js engine with custom helpers
const hbs = exphbs.create({
  helpers: require('./utils/helpers'), // Ensure custom helpers are included
  defaultLayout: 'main', // Set the default layout
});
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// Set up session with Sequelize store
app.use(
  session({
    secret: process.env.SESSION_SECRET, // Use environment variable for the secret
    cookie: {
      maxAge: 3600000, // 1 hour for example
    },
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
      db: sequelize,
    }),
  })
);

// Use API routes
app.use('/api', apiRoutes);

// Use page routes
app.use('/', pageRoutes);

// Global error handling for unhandled routes
app.use((req, res) => {
  res.status(404).send("Sorry, can't find that!");
});

// Start the server and sync the database
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
