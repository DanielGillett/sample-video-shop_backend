const mongoose = require('mongoose');
const Joi = require('joi');

const Customer = mongoose.model('Customer', new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 75
    },
    phone: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    },
    isGold: {
        type: Boolean, 
        default: false
    }
}));

function validateCustomer(customer) {
    const schema = {
        name: Joi.string().min(2).max(75).required(),
        phone: Joi.string().min(5).max(50).required(),
        isGold: Joi.boolean().required()
    };
    return Joi.validate(customer, schema);
}

// module.exports.Customer = Customer;
exports.Customer = Customer;
exports.validate = validateCustomer;