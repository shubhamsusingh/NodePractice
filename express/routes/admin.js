
const express = require('express');

const adminController=require('../controllers/admin');

const router = express.Router();


router.get('/add-product',adminController.getAddProduct);
router.get('/products',adminController.getProducts);
router.post('/product', adminController.postAddProduct);
router.get('/edit-product/:productId',adminController.getEditProduct);
// module.exports=router;
// exports.routes = router;
// exports.products = products;
module.exports=router;