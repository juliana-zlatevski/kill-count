//  REQUIREMENTS
const express = require('express');
const bodyParser = require('body-parser');
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

// HOME ROUTE
app.get('/', (req, res) => {
    res.send('hi');
})

app.use('/movies', controller.movies);

// LISTENER
app.listen(PORT, ()=> console.log(`server connected on port: ${PORT}`));