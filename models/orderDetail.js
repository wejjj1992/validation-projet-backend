const mongoose = require('mongoose');

const orderDetailSchema = mongoose.Schema({
    productId: { type: String, required: true },
    orderId: { type: String, required: true },
    quantity: { type: Number, required: true },
    priceOne: { type: Number, required: true },
    price: { type: Number, required: true },
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product"
    }
});

module.exports = mongoose.model('OrderDetail', orderDetailSchema);