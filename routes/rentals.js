const asyncMiddleware = require('../middleware/async');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const { Rental, validate } = require('../models/rental');
const { Movie } = require('../models/movie');
const { Customer } = require('../models/customer');
const mongoose = require('mongoose');
const Fawn = require('fawn');
const express = require('express');
const router = express.Router();

// Transaction-like mod
Fawn.init(mongoose);

router.get('/',  asyncMiddleware(async (req, res) => {
    const rentals = await Rental.find().sort('-dateOut');
    
    res.send(rentals);
}));

router.get('/:id',  asyncMiddleware(async (req, res) => {
    res.send('Todo: build the rental id get request');
}));

router.post('/', auth, asyncMiddleware(async (req, res) => {
    const { error } = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    const customer = await Customer.findById(req.body.customerId);
    if(!customer) return res.status(400).send('Invalid customer.');

    const movie = await Movie.findById(req.body.movieId);
    if(!movie) return res.status(400).send('Invalid movie.');

    if(movie.numberInStock === 0) return res.status(400).send('Movie not in stock.');

    let rental = new Rental({
        customer: {
            _id: customer._id,
            name: customer.name,
            phone: customer.phone
        },
        movie: {
            _id: movie._id,
            title: movie.title,
            dailyRentalRate: movie.dailyRentalRate
        }
    });

    /* CREATING A FAWN TASK FOR TANSACTION-LIKE PROCESS
        //
        rental = await rental.save();

        // Need to descrease the stock
        movie.numberInStock--;
        
        // We could use Two Phase Commit, but is beyond the scope of this course.
        // you can find it in mongoDB docs.
        // Instead, need to implement a transaction-like method so if something 
        // fails, none of this will be applied.
        movie.save(); */

        // you can read more about Fawn under gitHub documentation
        new Fawn.Task()
            .save('rentals', rental)
            .update('movies', { _id: movie._id }, {
                $inc: { numberInStock: -1 }
            })
            //.remove() // need to study gitHub docs
            .run();

    res.send(rental)
}));

router.put('/:id', auth,  asyncMiddleware(async (req, res) => {
    res.send('Todo: build the rental id put request');
}));

router.delete('/:id', [auth, admin],  asyncMiddleware(async (req, res) => {
    res.send('Todo: build the rental id delete request');
}));

module.exports = router;