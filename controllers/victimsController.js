const express = require('express');
const router = express.Router();

// importing DB
const db = require('../models');

// current path = 'victims'
// index route
router.get('/', (req, res) => {
    res.send('hey this is the victims index page!');
})

module.exports = router;