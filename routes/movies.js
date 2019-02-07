const auth = require('../middleware/auth');
const { Movie, validate } = require('../models/movie');
const { Genre } = require('../models/genre');
//const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    res.send(await Movie.find().sort('name'));
});

router.get('/:id', async (req, res) => {
    const movie = await Movie.findById(req.params.id);

    if(!movie) return res.status(404).send('The movie with the given ID could not be found.');
    
    res.send(movie);
});

router.post('/', auth, async (req, res) => {
    const { error } = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    const genre = await Genre.findById(req.body.genreId);
    if (!genre) return res.status(400).send('Invalid genre.');

    try{
        // let movie = new Movie({ 
        const movie = new Movie({
            title: req.body.title,
            genre: {
                _id: genre._id,
                name: genre.name
            },
            numberInStock: req.body.numberInStock,
            dailyRentalRate: req.body.dailyRentalRate
        });

        // starting implemtation for simplicity
            // movie = await movie.save();
        await movie.save()
        
        res.send(movie);

    }
    catch(err) {
        console.error('Error: ', err.message);
    }
});

router.put('/:id', auth, async (req, res) => {
    const { error } = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    
    const genre = await Genre.findById(req.body.genreId);
    if (!genre) return res.status(400).send('Invalid genre.');

    // const movie = await Movie.findOneAndUpdate(
    //     { _id: req.params.id },
    //     { $set: { 
    //         title: req.body.name,
    //         // Add more properties here if needed
    //     }},
    //     { new : true }
    //     );

    const movie = await Movie.findByIdAndUpdate(req.params.id, {
        title: req.body.title,
        genre: {
            _id: genre._id,
            name: genre.name
        },
        numberInStock: req.body.numberInStock,
        dailyRentalRate: req.body.dailyRentalRate
    }, { new: true });

    if (!movie) res.status(404).send('The movie with the given ID was not found.');
        
    res.send(movie);
});

router.delete('/:id', auth, async (req, res) => {
    const movie = await Movie.findByIdAndRemove(req.params.id);

    if(!movie) return res.status(404).send('The movie with the given ID was not found.');

    res.send(movie);
});

module.exports = router;