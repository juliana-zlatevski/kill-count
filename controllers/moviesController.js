const express = require('express');
const router = express.Router();


// importing db
const db = require('../models');

// current path = '/movies'
// index route

router.get('/', (req, res) => {
    db.Movie.find({}, (err,allMovies)=> {
        if(err) return console.log(err),
        console.log(allMovies);
        res.render('movies/index', {movies:allMovies})
    })
})

// new route
router.get('/new', (req, res) => {
    if (!req.session.currentUser){
        return res.redirect('/auth/login')
    }
    res.render('movies/new');
})

// // create + post route
router.post('/', (req, res) => {
    if(!req.session.currentUser){
        return res.redirect('/auth/login')
    }
    req.body.user = req.session.currentUser
    db.Movie.create(req.body, (err, createdMovie) => {
        if (err) return console.log(err);
        const context = {
            movies: createdMovie
        }
        res.redirect('/movies');
    })
})

// show route
router.get('/:movieId', (req, res) => {
    db.Movie.findById(req.params.movieId)
    .populate('victims')
    .exec((err, foundMovie) => {
        if (err) return console.log(err);
        const context = {
            movies: foundMovie, 
            victims: {"foundMovie": "victims.name"},
        } 
        res.render('movies/show', context);
        console.log('movies', req.params.movieId);
    })
})

// // delete route
router.delete('/:movieId', (req, res) => {
    if(!req.session.currentUser){
        return res.redirect('/auth/login')
    }
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