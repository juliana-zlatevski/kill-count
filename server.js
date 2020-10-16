//  REQUIREMENTS
const express = require('express');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const morgan = require('morgan');
const layouts = require('express-ejs-layouts');
const session = require('express-session');

// DOTENV
require('dotenv').config();
const app = express();
const PORT = process.env.PORT || 4000;

// VIEW ENGINE
app.set('view engine', 'ejs');

// CONTROLLERS
const ctrl = require('./controllers');

// MIDDLEWARE
app.use(bodyParser.urlencoded({extended: false}));
app.use(methodOverride('_method'));
app.use(morgan(':method :url'))
// BOOTSTRAP
app.use(express.static(`${__dirname}/public`));
//EXPRESS LAYOUTS
app.use(layouts);

//express session
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false, // Only save the session if a property changes
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 3
    }
  }));

// HOME ROUTE
app.get('/', (req, res) => {
    res.render('index');
})

// MOVIES ROUTES
app.use('/movies', ctrl.movies);

// VICTIMS ROUTES
app.use('/victims', ctrl.victims);

// USER ROUTES
app.use('/auth', ctrl.auth)

// LISTENER
app.listen(PORT, ()=> console.log(`server connected on port: ${PORT}`));