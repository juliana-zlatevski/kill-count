const Movie = require('./Movie');
const mongoose = require('mongoose');


mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
    useUnifiedTopology: true,
  });
  mongoose.connection.on('connected', () => {
    console.log('MongoDB connected successfully...');
  });

  mongoose.connection.on('error', (err) => {
    console.log(err);
  });


const movieseed = [
new Movie({
    title: 'Jaws',
    year: 1975,
    director: 'Stephen Spielberg',
    kills: 6
}),
new Movie({
    title: 'Alien',
    year: 1979,
    director: 'Ridley Scott',
    kills: 6
}),
new Movie({
    title: 'Nightmare on Elm Street',
    year: 1975,
    director: 'Roberrt Shaye',
    kills: 4
}),
new Movie({
    title: 'Halloween',
    year: 1978,
    director: 'John Carpenter',
    kills: 5
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