const Customer = require('../models/customer');
const fs = require('fs');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

//name address tel email password
exports.signup = (req, res, next) => {
    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            const customer = new Customer({
                name: req.body.name,
                address: req.body.address,
                tel: req.body.tel,
                email: req.body.email,
                password: hash
            });
            customer.save()
                .then(() => res.status(201).json({
                    message: 'Utilisateur créé !',
                    customer: customer,
                    token: jwt.sign({ customerId: customer._id },
                        'RANDOM_TOKEN_SECRET', { expiresIn: '24h' }
                    )
                }))
                .catch(error => res.status(400).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
};

exports.login = (req, res, next) => {
    Customer.findOne({ email: req.body.email })
        .then(customer => {
            if (!customer) {
                return res.status(401).json({ error: 'Utilisateur non trouvé !' });
            }
            bcrypt.compare(req.body.password, customer.password)
                .then(valid => {
                    if (!valid) {
                        return res.status(401).json({ error: 'Mot de passe incorrect !' });
                    }
                    res.status(200).json({
                        customerId: customer._id,
                        customer: customer,
                        token: jwt.sign({ customerId: customer._id },
                            'RANDOM_TOKEN_SECRET', { expiresIn: '24h' }
                        )
                    });
                })
                .catch(error => res.status(500).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
};

exports.createCustomer = (req, res, next) => {
    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            const customer = new Customer({
                name: req.body.name,
                address: req.body.address,
                tel: req.body.tel,
                email: req.body.email,
                password: hash
            });
            customer.save()
                .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
                .catch(error => res.status(400).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
};

exports.getOneCustomer = (req, res, next) => {
    Customer.findOne({
        _id: req.params.id
    }).then((customer) => {
        res.status(200).json(customer);
    }).catch((error) => {
        res.status(404).json({
            error: error
        });
    });
};

exports.modifyCustomer = (req, res, next) => {

    const customer = new Customer({
        _id: req.params.id,
        name: req.body.name,
        address: req.body.address,
        email: req.body.email
    });

    Customer.updateOne({ _id: req.params.id }, customer).then(() => {
        res.status(201).json({
            message: 'Customer updated successfully!'
        });
    }).catch((error) => {
        res.status(400).json({
            error: error
        });
    });
};

exports.deleteCustomer = (req, res, next) => {
    Customer.findOne({ _id: req.params.id })
        .then(customer => {
            const filename = customer.imageUrl.split('/images/')[1];
            fs.unlink(`images/${filename}`, () => {
                Customer.deleteOne({ _id: req.params.id })
                    .then(() => res.status(200).json({ message: 'Objet supprimé !' }))
                    .catch(error => res.status(400).json({ error }));
            });
        })
        .catch(error => res.status(500).json({ error }));
};

exports.getAllCustomer = (req, res, next) => {
    Customer.find().then((customers) => {
        res.status(200).json(customers);
    }).catch((error) => {
        res.status(400).json({
            error: error
        });
    });
};