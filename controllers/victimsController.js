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


module.exports = router;