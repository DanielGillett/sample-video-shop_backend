const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const { Genre, validate } = require('../models/genre')
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    res.send(await Genre.find().sort('name'));
});

router.get('/:id', async (req, res) => {
    const genre = await Genre.findById(req.params.id);

    if(!genre) return res.status(404).send('The genre with the given ID could not be found.');
    
    res.send(genre);
});

router.post('/', auth, async (req, res) => {
    const { error } = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    try{
        let genre = new Genre({ name: req.body.name });
        genre = await genre.save();

        res.send(genre);
    }
    catch (err) {
        console.error('Error: ', err[0].message);
    }
});

router.put('/:id', auth, async (req, res) => {
    const { error} = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    try{
        const genre = await Genre.findOneAndUpdate(
            { _id: req.params.id },
            { $set: { name: req.body.name } },
            { new : true }
        );

        if (!genre) res.status(404).send('The genre with the given ID was not found.');
        
        res.send(genre);
    }
    catch(err) {
        console.error('Error: ', err[0].message)
    }
});

router.delete('/:id', [auth, admin], async (req, res) => {
    // const genre = genres.find(g => g.id === parseInt(req.params.id));
    const genre = await Genre.findByIdAndRemove(req.params.id);

    if(!genre) return res.status(404).send('The genre with the given ID was not found.');

    res.send(genre);
});

module.exports = router;