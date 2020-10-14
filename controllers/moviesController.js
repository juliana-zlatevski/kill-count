const express = require('express');
const router = express.Router();
const movieseed = require('../models/seedMovies')

// importing db
const db = require('../models');

// current path = '/movies'
// index route
router.get('/', (req, res) => {
    db.Movie.find({})
        // const movieseed = Movie.find();
        .populate('movieseed')
        .exec((err, allMovies) => {
        if (err) return console.log(err);
        const context = {
            movies: allMovies,
            movieseed: movieseed
        }
        console.log(movieseed, "Hello???");
        console.log(allMovies, "added data?");
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
        res.redirect('/movies');
    })
})

// // show route
router.get('/:movieId', (req, res) => {
    db.Movie.findById(
        req.params.movieId
    )
    .populate('victims', 'movieseed')
    .exec((err, foundMovie) => {
        if (err) return console.log(err);
        const context = {
            movies: [foundMovie, movieseed],
            victims: {"foundMovie": "victims.name"}
        } 
        res.render('movies/show', context);
        console.log('movies', foundMovie);
    })
})

// // delete route
router.delete('/:movieId', (req, res) => {
    db.Movie.findByIdAndDelete(
        req.params.movieId,
        (err, deletedMovie) => {
            console.log(deletedMovie);
            if (err) return console.log(err);
            res.redirect('/movies');
        }
    )
})

// // edit route
router.get('/:movieId/edit', (req, res) => {
    db.Movie.findById(
        req.params.movieId,
        (err, foundMovie) => {
            if (err) return console.log(err);
            const context = {
                movies: foundMovie
            }
            res.render('movies/edit', context);
        }
    )
})

// // update (post/put) route
router.put('/:movieId', (req, res) => {
    db.Movie.findByIdAndUpdate(
        req.params.movieId,
        req.body,
        {new: true},
        (err, updatedMovie) => {
            if (err) return console.log(err);
            res.redirect('/movies');
        }
    )
})

module.exports = router;