const Movie = require('./Movie');
const mongoose = require('mongoose');
require('dotenv').config()


mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
    useUnifiedTopology: true,
  });
  mongoose.connection.on('connected', () => {
    console.log('SEED DATA MONGO: ADDING MOVIES');
  });

  mongoose.connection.on('error', (err) => {
    console.log(err);
  });


const movieseed = [
new Movie({
    title: 'Jaws',
    year: 1975,
    director: 'Stephen Spielberg',
    kill_count: 6,
}),
new Movie({
    title: 'Alien',
    year: 1979,
    director: 'Ridley Scott',
    kill_count: 6
}),
new Movie({
    title: 'Nightmare on Elm Street',
    year: 1975,
    director: 'Roberrt Shaye',
    kill_count: 4
}),
new Movie({
    title: 'Halloween',
    year: 1978,
    director: 'John Carpenter',
    kill_count: 5
})]

function runSeed() {
    let done = 0;
    for (var i = 0; i < movieseed.length; i++) {
        movieseed[i].save(function(err, result) {
            done++;
            if (done === movieseed.length) {
                exit();
            }
        })
    }
    
    function exit() {
        mongoose.disconnect();
    };
}

module.exports = movieseed;