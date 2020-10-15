const Victim = require('./Victim');
const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
    useUnifiedTopology: true,
  });
  mongoose.connection.on('connected', () => {
    console.log('SEED DATA MONGO');
  });

  mongoose.connection.on('error', (err) => {
    console.log(err);
  });

const victimseed = [
    new Victim({
        name: "Judith Meyers",
        age: 16,
        cause_of_death: "Stabbed 9x with Butcher knife",
        movie: "Halloween",
        golden_chainsaw: false,
        dull_machete: false,
    }),
    new Victim({
        name: 'Mechanic dude',
        age: 52,
        cause_of_death: "Body seen in grass",
        movie: "Halloween",
        golden_chainsaw: false,
        dull_machete: true,
    }),
    new Victim({
        name: "Annie Brackett",
        age: 19,
        cause_of_death: "Strangled and throat slit",
        movie: "Halloween",
        golden_chainsaw: false,
        dull_machete: false,
    }),
    new Victim({
        name: "Bob Simms",
        age: 58,
        cause_of_death: "Stabbed through chest",
        movie: "Halloween",
        golden_chainsaw: true,
        dull_machete: false,
    }),
    new Victim({
        name: "Lynda",
        age: 20,
        cause_of_death: "Strangled by phone cord",
        movie: "Halloween",
        golden_chainsaw: false,
        dull_machete: false,
    }),
    new Victim({
        name: "Kane",
        age: 20,
        cause_of_death: "Chest bursted by alien",
        movie: "Alien",
        golden_chainsaw: true,
        dull_machete: false,
    }),
    new Victim({
        name: "Brett",
        age: 20,
        cause_of_death: "Impaled through head with second mouth",
        movie: "Alien",
        golden_chainsaw: false,
        dull_machete: false,
    }),
    new Victim({
        name: "Dallas",
        age: 20,
        cause_of_death: "Killed offscreen",
        movie: "Alien",
        golden_chainsaw: false,
        dull_machete: true,
    }),
    new Victim({
        name: "Ash (Android)",
        age: 20,
        cause_of_death: "Decapitated and dismantled",
        movie: "Alien",
        golden_chainsaw: false,
        dull_machete: false,
    }),
    new Victim({
        name: "Parker",
        age: 20,
        cause_of_death: "Impaled by alien's second mouth",
        movie: "Alien",
        golden_chainsaw: false,
        dull_machete: false,
    }),
    new Victim({
        name: "Lambert",
        age: 20,
        cause_of_death: "Killed offscreen",
        movie: "Alien",
        golden_chainsaw: false,
        dull_machete: false,
    }),
    new Victim({
        name: "Tina Grey",
        age: 20,
        cause_of_death: "Finger knifed in the chest",
        movie: "The Nightmare on Elm Street",
        golden_chainsaw: false,
        dull_machete: false,
    }),
    new Victim({
        name: "Rod Lane",
        age: 20,
        cause_of_death: "Hanged in jail cell",
        movie: "The Nightmare on Elm Street",
        golden_chainsaw: false,
        dull_machete: true,
    }),
    new Victim({
        name: "Glen Lantz",
        age: 20,
        cause_of_death: "Pulled into bed and turned into blood geyser",
        movie: "The Nightmare on Elm Street",
        golden_chainsaw: true,
        dull_machete: false,
    }),
    new Victim({
        name: "Marge Thompson",
        age: 20,
        cause_of_death: "Burned to death",
        movie: "The Nightmare on Elm Street",
        golden_chainsaw: false,
        dull_machete: false,
    }),
    new Victim({
        name: "Chrissie Watkins",
        age: 20,
        cause_of_death: "Eaten bu Bruce",
        movie: "Jaws",
        golden_chainsaw: false,
        dull_machete: false,
    }),
    new Victim({
        name: "Alex Kinter",
        age: 20,
        cause_of_death: "Eaten",
        movie: "Halloween",
        golden_chainsaw: false,
        dull_machete: true,
    }),
    new Victim({
        name: "Ben Gardner",
        age: 20,
        cause_of_death: "Found dead in boat",
        movie: "Jaws",
        golden_chainsaw: false,
        dull_machete: false,
    }),
    new Victim({
        name: "Man in Estuary",
        age: 20,
        cause_of_death: "Eaten",
        movie: "Jaws",
        golden_chainsaw: false,
        dull_machete: false,
    }),
    new Victim({
        name: "Quint",
        age: 20,
        cause_of_death: "Falls and gets eaten",
        movie: "Jaws",
        golden_chainsaw: true,
        dull_machete: false,
    }),
    new Victim({
        name: "Bruce the Shark",
        age: 20,
        cause_of_death: "Blown up by shooting oxygen tank in mouth",
        movie: "Jaws",
        golden_chainsaw: false,
        dull_machete: false,
    })
]

function runSeed() {
    let done = 0;
    for (var i = 0; i < victimseed.length; i++) {
        victimseed[i].save(function(err, result) {
            done++;
            if (done === victimseed.length) {
                exit();
            }
        })
    }
    
    function exit() {
        mongoose.disconnect();
    };
}
runSeed();

module.exports = victimseed;