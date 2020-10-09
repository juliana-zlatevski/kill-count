const express = require('express');
const router = express.Router();

// importing db
const db = require('../models');

// current path = '/movies'
// index route
router.get('/', (req, res) => {
    res.render('movies/index');
})

// new route
router.get('/new', (req, res) => {
    res.render('movies/new');
})

// // create + post route
// router.post('/', (req, res) => {
    
// })

// // show route
// router.get(':/movieId', (req, res) => {
    
// })

// // delete route
// router.delete(':/movieId', (req, res) => {

// })

// // edit route
// router.get(':/movieId/edit', (req, res) => {

// })

// // update (post/put) route
// router.put(':/movieId', (req, res) => {

// })

module.exports = router;