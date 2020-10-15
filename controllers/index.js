const movieseed = require('../models/seedMovies');

module.exports = {
    movies: require('./moviesController'),
    victims: require('./victimsController'),
    auth: require('./authController')
}