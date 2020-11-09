const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const authCustomer = require('../middleware/authCustomer');
const multer = require('../middleware/multer-config');

const orderCtrl = require('../controllers/order');
// adminstration
router.get('/', auth, orderCtrl.getAllOrder);
router.post('/', auth,  orderCtrl.createOrder);
router.get('/:id', auth, orderCtrl.getOneOrder);
router.put('/:id', auth, orderCtrl.modifyOrder);
router.delete('/:id', auth, orderCtrl.deleteOrder);
// boutique
router.get('/b/cutomer/', authCustomer, orderCtrl.getOrdersByCustomer);
router.post('/b/', authCustomer, orderCtrl.createOrder);
router.get('/b/:id', authCustomer, orderCtrl.getOneOrder);


module.exports = router;