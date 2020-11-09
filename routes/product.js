const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

const productCtrl = require('../controllers/product');
//boutique
router.get('/b/', productCtrl.getAllProduct);
// administration
router.get('/', auth, productCtrl.getAllProduct);
router.post('/', auth, productCtrl.createProduct);
router.get('/:id', auth, productCtrl.getOneProduct);
router.put('/:id', auth, productCtrl.modifyProduct);
router.delete('/:id', auth, productCtrl.deleteProduct);


module.exports = router;