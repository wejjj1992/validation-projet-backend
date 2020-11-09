const Product = require('../models/product');
const fs = require('fs');
const jwt = require('jsonwebtoken');

exports.createProduct = (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
    const userId = decodedToken.userId;

    const product = new Product({
        title: req.body.title,
        description: req.body.description,
        imageUrl: req.body.imageUrl,
        price: req.body.price,
        userId: userId
    });

    product.save().then(() => {
        res.status(201).json({
            message: 'Post saved successfully!'
        });
    }).catch((error) => {
        res.status(400).json({
            error: error
        });
    });
};

exports.getOneProduct = (req, res, next) => {
    Product.findOne({
        _id: req.params.id
    }).then((product) => {
        res.status(200).json(product);
    }).catch((error) => {
        res.status(404).json({
            error: error
        });
    });
};

exports.modifyProduct = (req, res, next) => {

    const product = new Product({
        _id: req.params.id,
        title: req.body.title,
        description: req.body.description,
        //        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
        imageUrl: req.body.imageUrl,
        price: req.body.price,
        userId: req.body.userId
    });

    Product.updateOne({ _id: req.params.id }, product).then(() => {
        res.status(201).json({
            message: 'Product updated successfully!'
        });
    }).catch((error) => {
        res.status(400).json({
            error: error
        });
    });
};

exports.deleteProduct = (req, res, next) => {
    Product.findOne({ _id: req.params.id })
        .then(product => {
            const filename = product.imageUrl.split('/images/')[1];
            fs.unlink(`images/${filename}`, () => {
                Product.deleteOne({ _id: req.params.id })
                    .then(() => res.status(200).json({ message: 'Objet supprimé !' }))
                    .catch(error => res.status(400).json({ error }));
            });
        })
        .catch(error => res.status(500).json({ error }));
};

exports.getAllProduct = (req, res, next) => {
    Product.find().then((products) => {
        res.status(200).json(products);
    }).catch((error) => {
        res.status(400).json({
            error: error
        });
    });
};