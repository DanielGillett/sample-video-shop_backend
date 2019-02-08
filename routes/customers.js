const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const { Customer, validate } = require('../models/customer');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    res.send(await Customer.find().sort('name'));
});

router.get('/:id', async (req, res) => {
    const customer = await Customer.findById(req.params.id);
    if(!customer) return res.status(404).send('The customer with the given ID could not be found.');
    
    res.send(customer);
});

router.post('/', auth, async (req, res) => {
    const { error } = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    let customer = new Customer({ 
        name: req.body.name,
        phone: req.body.phone,
        isGold: req.body.isGold
    });
    customer = await customer.save();

    res.send(customer);
});

router.put('/:id', auth, async (req, res) => {
    const { error} = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    
    // Deprecation Warning! Using findOneAndUpdate with Try, Catch
    const customer = await Customer.findOneAndUpdate(
        { _id: req.params.id },
        { $set: { 
            name: req.body.name,
            phone: req.body.phone,
            isGold: req.body.isGold 
        }},
        { new : true }
    );
    if (!customer) res.status(404).send('The customer with the given ID was not found.');
        
    res.send(customer);
});

router.delete('/:id', [auth, admin], async (req, res) => {
    const customer = await Customer.findByIdAndRemove(req.params.id);
    if(!customer) return res.status(404).send('The customer with the given ID was not found.');

    res.send(customer);
});

module.exports = router;