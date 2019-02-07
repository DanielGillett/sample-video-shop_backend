const auth = require('../middleware/auth');
// const jwt = require('jsonwebtoken');
// const config = require('config');
const bcrypt = require('bcrypt');
const _ = require('lodash');
const { User, validate } = require('../models/user');
const express = require('express');
const router = express.Router();

router.post('/', auth, async (req, res) => {
    const { error } = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({ email: req.body.email });
    if(user) return res.status(400).send('User already registered.');
    
    try{
        // user = new User({
        //     name: req.body.name,
        //     email: req.body.email,
        //     password: req.body.password
        // });
        // Using lodash...
        user = new User(_.pick(req.body, ['name', 'email', 'password']));
        // adding bcrypt for password...
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);

        await user.save();

        // Modify the response to the client to exclude 
        // the password and db version properties
        // res.send({
        //     name: user.name,
        //     email: user.email
        // });

        // lodash 'pick' method
        const token = user.generateAuthToken();
        res.header('x-auth-token', token).send(_.pick(user, ['_id', 'name', 'email']));
    }
    catch (err) {
        console.error('Error: ', err);
    }
});

module.exports = router;