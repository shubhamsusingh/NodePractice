
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
exports.getCheckout=(req,res,next)=>{
res.render('shop/checkout',{
  path:'/checkout',
  pageTitle:'Checkout'
})
}