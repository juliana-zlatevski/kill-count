const mongoose = require('mongoose');
const movieSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    year: {
        type: Number,
        required: true
    },
    director: String,
    kill_count: Number,
    victims:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Victim'
    }]
}, {timestamps: true})

const Movie = mongoose.model('Movie', movieSchema);
module.exports = Movie;