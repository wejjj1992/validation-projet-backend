const OrderDetail = require('../models/orderDetail');
const fs = require('fs');

exports.createOrderDetail = (req, res, next) => {
    const orderDetail = new OrderDetail({
        title: req.body.title,
        description: req.body.description,
        imageUrl: req.body.imageUrl,
        price: req.body.price,
        userId: req.body.userId
    });

    orderDetail.save().then(() => {
        res.status(201).json({
            message: 'Post saved successfully!'
        });
    }).catch((error) => {
        res.status(400).json({
            error: error
        });
    });
};

exports.getOneOrderDetail = (req, res, next) => {
    OrderDetail.findOne({
        _id: req.params.id
    }).then((orderDetail) => {
        res.status(200).json(orderDetail);
    }).catch((error) => {
        res.status(404).json({
            error: error
        });
    });
};

exports.modifyOrderDetail = (req, res, next) => {

    const orderDetail = new OrderDetail({
        _id: req.params.id,
        title: req.body.title,
        description: req.body.description,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
        price: req.body.price,
        userId: req.body.userId
    });

    OrderDetail.updateOne({ _id: req.params.id }, orderDetail).then(() => {
        res.status(201).json({
            message: 'OrderDetail updated successfully!'
        });
    }).catch((error) => {
        res.status(400).json({
            error: error
        });
    });
};

exports.deleteOrderDetail = (req, res, next) => {
    OrderDetail.findOne({ _id: req.params.id })
        .then(orderDetail => {
            const filename = orderDetail.imageUrl.split('/images/')[1];
            fs.unlink(`images/${filename}`, () => {
                OrderDetail.deleteOne({ _id: req.params.id })
                    .then(() => res.status(200).json({ message: 'Objet supprimé !' }))
                    .catch(error => res.status(400).json({ error }));
            });
        })
        .catch(error => res.status(500).json({ error }));
};

exports.getAllOrderDetail = (req, res, next) => {
    OrderDetail.find().then((orderDetails) => {
        res.status(200).json(orderDetails);
    }).catch((error) => {
        res.status(400).json({
            error: error
        });
    });
};