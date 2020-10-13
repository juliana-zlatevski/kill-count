const mongoose = require('mongoose');
const victimSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    time_killed: {
        type: String,
        // required: true
    },
    cause_of_death: {
        type: String,
        required: true
    },
    movie: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Movie'
    },
    dull_machete: Boolean,
    golden_chainsaw: Boolean,
    movie: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Movie'
    }
}, {timestamps: true})

const Victim = mongoose.model('Victim', victimSchema);
module.exports = Victim;