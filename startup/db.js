const winston = require('winston');
const mongoose = require('mongoose');

// newer winston require that you define a new transport

module.exports = function() {
    mongoose.connect('mongodb://localhost/vidly-app', { useNewUrlParser: true })
    // .then() => console.log('Connected to MongoDB...')
    .then(() => winston.info('Connected to MongoDB...'))
    //.catch(err => console.error('Could not connect to MongoDB...', err));
}