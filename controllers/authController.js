const express = require('express');
const bcrypt = require('bcryptjs');
const router = express.Router();

const db = require('../models');
const { lastIndexOf } = require('../models/seedMovies');

// current path /auth

//--------------register
//get register
router.get('/register', (req, res) => {
    res.render('auth/register');
});

//------post auth (new user)
router.post('/', (req, res) => {
    db.User.findOne({email: req.body.email}, (err, user) => {
        if(err) {console.log(err)};
        if(user) {
            alert('User already exists, please sing up or log into your account');
            return res.redirect('/auth/register');
        }
        bcrypt.hash(req.body.password, salt, (err, hashedPassword) => {
            if(err) {console.log('Error hashing password')};
            const newUser = {
                name: req.body.name,
                email: req.body.email,
                password: hashedPassword
            }
            db.User.create(newUser, (err, newUser) => {
                if(err) {console.log(err)};
                res.redirect('/auth/login');
            })
        })
    });
});

//-------login
router.post('/login', (req, res) => {
    db.User.findOne({email: req.body.email}, (err, user) => {
        if(err) {console.log(err)};
        if (!user) {
            console.log('Login route: no user match');
            return res.redirect('/auth/login')
        }
        bcrypt.compare(req.body.password, user.password, (err, matchPw) => {
            if(err) {console.log("passwords not a match")};
            if (matchPw) {
                req.session.currentUser = user._id;
                res.redirect('/movies')
            }
        })
    })
})

//-----logout
router.delete('/login', (req, res) => {
    if (req.session.currentUser) {
        req.session.destroy((err) => {
            if(err) return console.log('failed to end session');

            res.redirect('/auth/login')
        })
    }
});

module.exports = router;