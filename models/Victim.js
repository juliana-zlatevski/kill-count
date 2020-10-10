const mongoose = require('mongoose');
const victimSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    cause_of_death: {
        type: String,
        required: true
    },
    dull_machete: Boolean,
    golden_chainsaw: Boolean
}, {timestamps: true})

const Victim = mongoose.model('Victim', victimSchema);
module.exports = Victim;