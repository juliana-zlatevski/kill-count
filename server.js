//  REQUIREMENTS
const express = require('express');
const app = express();

// DOTENV
require('dotenv').config();
const PORT = process.env.PORT || 4000;

// HOME ROUTE
app.get('/', (req, res) => {
    res.send('hi');
})

// LISTENER
app.listen(PORT, ()=> console.log(`server connected on port: ${PORT}`));