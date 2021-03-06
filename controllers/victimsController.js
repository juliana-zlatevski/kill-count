const express = require('express');
const router = express.Router();

// importing DB
const db = require('../models');


// current path = '/victims'
// index route
router.get('/', (req, res) => {
    db.Victim.find({}, (err, allVictims) => {
        console.log(allVictims);
        const context = {
            victims: allVictims
        }
        res.render('victims/index', context);
    })
})

// new route
router.get('/new', (req, res) => {
    if(!req.session.currentUser){
        return res.redirect('/auth/login')
    }
    db.Movie.find({}, (err, allMovies) => {
        if (err) return console.log(err);
        res.render('victims/new', {
            movies: allMovies
        })
    })
})

// create + post route
router.post('/', (req, res) => {
    // converting dull_machete & golden_chainsaw into boolean values
    req.body.golden_chainsaw = req.body.golden_chainsaw === 'on';
    req.body.dull_machete = req.body.dull_machete === 'on';

    db.Victim.create(req.body, (err, createdVictim) => {
        if (err) return console.log(err);
        db.Movie.findById(req.body.movieId, (err, foundMovie) => {
            if (err) return console.log(err);
            foundMovie.victims.push(createdVictim);
            foundMovie.save((err, savedMovie) => {
                res.redirect('/victims');
            })
        })
    })
})

// SHOW ROUTE
router.get('/:victimId', (req, res) => {
    db.Victim.findById(req.params.victimId)
        .populate('movies')
        .exec((err, foundVictim) => {
            if (err) return console.log(err);
            const context = {
                victims: foundVictim,
                movies: {"foundVictim": "movies.title"}
            }
            // console.log(movies);
            res.render('victims/show', context);
            // console.log('victims', foundVictims);
        })
})




// delete route
router.delete('/:victimId', (req, res) => {
    if(!req.session.currentUser){
        return res.redirect('/auth/login')
    }
    db.Victim.findByIdAndDelete(
        req.params.victimId,
        (err, deletedVictim) => {
            if (err) return console.log(err);
            res.redirect('/victims');
        }
    )
})

// edit route
router.get('/:victimId/edit', (req, res) => {
    db.Victim.findById(
        req.params.victimId,
        (err, foundVictim) => {
            if (err) return console.log(err);
            const context = {
                victims: foundVictim
            }
            res.render('victims/edit', context);
        }
    )
})

// update (post/put) route
router.put('/:victimId', (req, res) => {
    // converting dull_machete & golden_chainsaw into boolean values
    req.body.golden_chainsaw = req.body.golden_chainsaw === 'on';
    req.body.dull_machete = req.body.dull_machete === 'on';

    db.Victim.findByIdAndUpdate(
        req.params.victimId,
        req.body,
        {new: true},
        (err, updatedVictim) => {
            if (err) return console.log(err);
            res.redirect('/victims');
        }
    )
})


module.exports = router;