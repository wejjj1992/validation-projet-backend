const Order = require('../models/order');
const Customer = require('../models/customer')
const jwt = require('jsonwebtoken');

exports.createOrder = (req, res, next) => {

    const order = new Order({
        reference: req.body.reference,
        customerId: req.body.customerId,
        totalPrice: req.body.totalPrice,
        products: req.body.products
    });

    order.save().then(() => {
        res.status(201).json({
            message: 'Post saved successfully!'
        });
    }).catch((error) => {
        res.status(400).json({
            error: error
        });
    });
};

exports.getOneOrder = (req, res, next) => {
    Order.findOne({
        _id: req.params.id
    }).then((order) => {
        res.status(200).json(order);
    }).catch((error) => {
        res.status(404).json({
            error: error
        });
    });
};

exports.modifyOrder = (req, res, next) => {

    const order = new Order({
        _id: req.params.id,
        reference: req.body.reference,
        customerId: req.body.customerId,
        totalPrice: req.body.totalPrice,
    });

    Order.updateOne({ _id: req.params.id }, order).then(() => {
        res.status(201).json({
            message: 'Order updated successfully!'
        });
    }).catch((error) => {
        res.status(400).json({
            error: error
        });
    });
};

exports.deleteOrder = (req, res, next) => {
    Order.findOne({ _id: req.params.id })
        .then(order => {
            Order.deleteOne({ _id: req.params.id })
                .then(() => res.status(200).json({ message: 'Objet supprimé !' }))
                .catch(error => res.status(400).json({ error }));

        })
        .catch(error => res.status(500).json({ error }));
};

exports.getAllOrder = (req, res, next) => {
    Order.find().then((orders) => {
        res.status(200).json(orders);
    }).catch((error) => {
        res.status(400).json({
            error: error
        });
    });
};


exports.getOrdersByCustomer = (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
    const customerId = decodedToken.customerId;

    Order.find({ customerId: customerId }).then((orders) => {
        res.status(200).json(orders);
    }).catch((error) => {
        res.status(400).json({
            error: error
        });
    });
};
