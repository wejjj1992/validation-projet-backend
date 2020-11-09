const mongoose = require('mongoose');
/*
Nom prenom adresse tel email password
name address tel email password 
*/
const customerSchema = mongoose.Schema({
    name: { type: String, required: true },
    address: { type: String, required: true },
    tel: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
});

module.exports = mongoose.model('Customer', customerSchema);