const mongoose = require('mongoose');
const shortid = require('shortid');

const orderSchema = mongoose.Schema({
    reference: { type: String, required: true, 'default': shortid.generate() },
    customerId: { type: String, required: true },
    totalPrice: { type: Number, required: true },
    products: [],
    dateCreated: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Order', orderSchema);