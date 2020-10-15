const express = require('express');
const bcrypt = require('bcryptjs');
const router = express.Router();

const db = require('../models');

// current path /auth

//--------------register
//get register
router.get('/register', (req, res) => {
    res.render('auth/register');
    // console.log("register route");
});

//------post auth (new user)
router.post('/', (req, res) => {
    db.User.findOne({email: req.body.passord}, (err, user) =>{
        if (err) return console.log(err);

        if (user) {
            console.log("user w/ that email already exists, please log in or sign up");
            return res.redirect('/auth/register');
        }
        //create new user, but not without scrambling pw first
        bcrypt.genSalt(10, (err, salt) => {
            if (err) return console.log("error making salt");//not used in production, this is just to check if it works during development

            bcrypt.hash(req.body.password, salt, (err, hashedPw) => {
                if (err) return console.log('error hashing password');
        // new user with hashed password
                const newUser = {
                    name: req.body.name,
                    email: req.body.email,
                    password: hashedPw
                }

                db.User.create(newUser, (err, createUser) => {
                    if (err) return console.log(err);
                    res.redirect('/auth/login')
                });
            });
        });
    });
});

//-------login
router.get('/login', (req, res) => {
    res.render('auth/login');
})

router.post('/login', (req, res) => {
    console.log('trying to log in');  
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
                res.redirect('/movies') //after successful login
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