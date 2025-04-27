
const Product = require('../models/products');
const path = require('../utils/path');
 

exports.getProducts=(req,res,next)=>{
  const products=Product.fetchAll((products)=>{
    res.render('shop/product-list',{prods:products,pageTitle:'Shop',path:"/products",hasProducts : products.length > 0, activeShoap:true,productCSS:true});
  })
    // const product=adminData.products;
    // res.sendFile(path.join(rootDir,'views','shop.html'));
    // const products=Product.fetchAll();
   
}
exports.getProduct = (req,res,next)=>{
  const prodId=req.params.productId;
  //  console.log(prodId);
  Product.fetchById(prodId,product=>{
    res.render('shop/product-details',{product:product,pageTitle:product.title,path:"/products"});
  })
  //  res.redirect('/');

}
exports.getIndex = (req,res,next)=>{
  Product.fetchAll((products)=>{
    res.render('shop/index',{prods:products,pageTitle:'Shop',path:"/",hasProducts : products.length > 0, activeShoap:true,productCSS:true});
  })
}
exports.getCart =(req,res,next)=>{
  res.render('shop/cart',{
    path:'/cart',
    pageTitle:'Your Cart'
  })
}
exports.postCart=(req,res,next)=>{
   const prodId=req.body.productId;
   console.log(prodId);
   res.redirect('/cart');
}
exports.getCheckout=(req,res,next)=>{
res.render('shop/checkout',{
  path:'/checkout',
  pageTitle:'Checkout'
})
}

exports.getOrderDetails = (req,res,next)=>{
 res.render('shop/orders',{
  path : '/orders',
  pageTitle : "Order Details"
 })
}