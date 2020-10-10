const express = require('express');
const router = express.Router();

// importing DB
const db = require('../models');

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
    res.render('victims/new');
})

// create + post route
router.post('/', (req, res) => {
    // converting dull_machete & golden_chainsaw into boolean values
    req.body.golden_chainsaw = req.body.golden_chainsaw === 'on';
    req.body.dull_machete = req.body.dull_machete === 'on';

    db.Victim.create(req.body, (err, createdVictim) => {
        if (err) return console.log(err);
        const context = {
            victims: createdVictim
        }
        console.log(createdVictim);
        res.redirect('/victims');
    })
})

// show route
router.get('/:victimId', (req, res) => {
    db.Victim.findById(
        req.params.victimId,
        (err, foundVictim) => {
            if (err) return console.log(err);
            const context = {
                victims: foundVictim
            }
            res.render('victims/show', context);
        }
    )
})

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

module.exports = router;