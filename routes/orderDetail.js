const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');

const orderDetailCtrl = require('../controllers/orderDetail');
// administration
router.get('/', auth, orderDetailCtrl.getAllOrderDetail);
router.post('/', auth, orderDetailCtrl.createOrderDetail);
router.get('/:id', auth, orderDetailCtrl.getOneOrderDetail);
router.put('/:id', auth, orderDetailCtrl.modifyOrderDetail);
router.delete('/:id', auth, orderDetailCtrl.deleteOrderDetail);
// boutique

module.exports = router;