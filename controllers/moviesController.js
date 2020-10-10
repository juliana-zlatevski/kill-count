const express = require('express');
const router = express.Router();

// importing db
const db = require('../models');

// current path = '/movies'
// index route
router.get('/', (req, res) => {
    db.Movie.find({}, (err, allMovies) => {
        if (err) return console.log(err);
        const context = {
            movies: allMovies
        }
        res.render('movies/index', context);
    })
})

// new route
router.get('/new', (req, res) => {
    res.render('movies/new');
})

// // create + post route
router.post('/', (req, res) => {
    db.Movie.create(req.body, (err, createdMovie) => {
        if (err) return console.log(err);
        const context = {
            movies: createdMovie
        }
        console.log(createdMovie);
        res.redirect('/movies');
    })
})

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