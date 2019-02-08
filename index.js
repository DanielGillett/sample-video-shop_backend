const error = require('./middleware/error');
const config = require('config');
// moved these two so we only have to reference it once
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const mongoose = require('mongoose');
const home = require('./routes/home');
const genres = require('./routes/genres');
const customers = require('./routes/customers');
const movies = require('./routes/movies');
const rentals = require('./routes/rentals');
const users = require('./routes/users');
const auth = require('./routes/auth');
const express = require('express');
const app = express();

if (!config.get('jwtPrivateKey')) {
    console.error('FATAL ERROR: jwtPrivateKey is not defined.');
    process.exit(1); // anything but 0 (zero) is a fatal error
}

mongoose.connect('mongodb://localhost/vidly-app', { useNewUrlParser: true })
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.error('Could not connect to MongoDB...', err));

app.use(express.json());
app.use('/api/genres/', genres);
app.use('/api/customers/', customers);
app.use('/api/movies/', movies);
app.use('/api/rentals/', rentals);
app.use('/api/users/', users);
app.use('/api/auth', auth);
app.use('/', home);
app.use(error);

// Set or Export a port in terminal...
// BASH terminal ► export PORT=5000
const port = process.env.port || 3000;
app.listen(port, () => console.log(`Listening on port ${port}`));