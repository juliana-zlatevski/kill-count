const express = require('express');
const router = express.Router();

// importing DB
const db = require('../models');
const { find } = require('../models/Movie');

// current path = 'victims'
// index route
router.get('/', (req, res) => {
    db.Victim.find({}, (err, allVictims) => {
        const context = {
            victims: allVictims
        }
        res.render('victims/index', context);
    })
})

// new route
router.get('/new', (req, res) => {
    db.Movie.find({}, (err, allMovies) => {
        if (err) {console.log(err);}

        const context = {movies: allMovies};
        res.render('victims/new', context)
        console.log(req.body);
    });
});

// create + post route
router.post('/', (req, res) => {
    // converting dull_machete & golden_chainsaw into boolean values
    req.body.golden_chainsaw = req.body.golden_chainsaw === 'on';
    req.body.dull_machete = req.body.dull_machete === 'on';

    db.Victim.create(req.body, (err, createdVictim) => {
        if (err) return console.log(err)
        else{
            db.Movie.findById(req.body.movie, (err, findMovie) => {
                // console.log('option A', req.body); //logs opbject (but says its null prototype)
                // console.log("option B", req.body.movie); //logs ID #
                if(err) return console.log(err);
                console.log('hello?', findMovie);
                findMovie.victims.push(createdVictim);
                findMovie.save((err, saveMovie) => {
                    if(err) return console.log(err);
                    console.log(saveMovie)
                    res.redirect('/victims')
                })
            })
        }
    })
})

// show route
// router.get('/:victimId', (req, res) => {
//     db.Victim.findById(req.params.victimId)
//         .populate('movie')
//         .exec((err, victimById) => {
//             if (err) return console.log(err);

//             console.log('victim by id', victimById);

//             res.render('victims/show', victimById)
//         });
// });

router.get('/:victimId', (req, res) => {
    db.Movie.findOne({'victims': req.params.id})
    .populate(
        {
            path:'victims',
            match: {_id: req.params.id}
        })
    .exec((err, foundMovie) => {
        if (err) return console.log(err);

        console.log(foundMovie, 'this was found');
        if(err) {
            res.send(err);
        } else {
            res.render('victims/show',  {
                movies: foundMovie,
                victims: foundMovie.victims
            });
        }
    })
});


// delete route
router.delete('/:victimId', (req, res) => {
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