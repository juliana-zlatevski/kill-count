//  REQUIREMENTS
const express = require('express');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const layouts = require('express-ejs-layouts');
const session = require('express-session');
const app = express();

// DOTENV
require('dotenv').config();
const PORT = process.env.PORT || 4000;

// VIEW ENGINE
app.set('view engine', 'ejs');

// CONTROLLERS
const controller = require('./controllers');

// MIDDLEWARE
app.use(bodyParser.urlencoded({extended: false}));
app.use(methodOverride('_method'));
// BOOTSTRAP
app.use(express.static(`${__dirname}/public`));
//EXPRESS LAYOUTS
app.use(layouts);

//express session
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000*60*60*24
    }
}));

// HOME ROUTE
app.get('/', (req, res) => {
    res.render('index');
})

// MOVIES ROUTES
app.use('/movies', controller.movies);

// VICTIMS ROUTES
app.use('/victims', controller.victims);

// USER ROUTES
app.use('/users', controller.users)

// LISTENER
app.listen(PORT, ()=> console.log(`server connected on port: ${PORT}`));