const movieseed = require('../models/seedMovies');

module.exports = {
    movies: require('./moviesController'),
    victims: require('./victimsController'),
    users: require('./authController')
}