const path=require('path');
const express=require('express');
const shopController=require('../controllers/shop');

const router=express.Router();

router.get('/',shopController.getIndex);
router.get('/products',shopController.getProducts);
router.get('/cart',shopController.getCart);
router.post('/cart',shopController.postCart);
router.get('/checkout',shopController.getCheckout);
router.get('/orders',shopController.getOrderDetails);
router.get('/products/:productId',shopController.getProduct);
// router.get('/cart');
// router.get('/checkout');
module.exports=router;