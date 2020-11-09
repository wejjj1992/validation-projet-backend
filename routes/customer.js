const express = require('express');
const router = express.Router();

const authCustomer = require('../middleware/authCustomer');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

const customerCtrl = require('../controllers/customer');
// Boutique 
router.post('/b/signup', customerCtrl.signup);
router.post('/b/login', customerCtrl.login);

// admininstration 
router.get('/', auth, customerCtrl.getAllCustomer);
router.post('/', auth, multer, customerCtrl.createCustomer);
router.get('/:id', auth, customerCtrl.getOneCustomer);
router.put('/:id', auth, customerCtrl.modifyCustomer);
router.delete('/:id', auth, customerCtrl.deleteCustomer);


module.exports = router;