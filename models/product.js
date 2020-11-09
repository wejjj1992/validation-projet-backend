const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    imageUrl: { type: String, required: false },
    userId: { type: String, required: false },
    price: { type: Number, required: true },
});

module.exports = mongoose.model('Product', productSchema);