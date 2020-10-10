//  REQUIREMENTS
const express = require('express');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
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

// HOME ROUTE
app.get('/', (req, res) => {
    res.render('index');
})

// MOVIES ROUTES
app.use('/movies', controller.movies);

// VICTIMS ROUTES
app.use('/victims', controller.victims);

// LISTENER
app.listen(PORT, ()=> console.log(`server connected on port: ${PORT}`));