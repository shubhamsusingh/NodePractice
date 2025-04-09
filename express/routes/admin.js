
const express = require('express');

const productController=require('../controllers/products');

const router = express.Router();


router.get('/add-product',productController.getAddProduct);
router.post('/product', productController.postAddProduct);
// module.exports=router;
// exports.routes = router;
// exports.products = products;
module.exports=router;