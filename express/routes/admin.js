
const express = require('express');

const adminController=require('../controllers/admin');

const router = express.Router();


router.get('/add-product',adminController.getAddProduct);
// router.get('/products');
router.post('/product', adminController.postAddProduct);
// module.exports=router;
// exports.routes = router;
// exports.products = products;
module.exports=router;