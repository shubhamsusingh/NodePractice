
const Product = require('../models/products');
 exports.getAddProduct = (req, res, next) => {
    // res.send('<h1>Add product </h1><form action="/product" method="POST"><input type="text" name="title"></input><button type="submit">Submit</button></form>')
    // res.sendFile(path.join(rootDir,'views','add-product.html'));
    res.render("add-product", 
        { pageTitle: "Add-Product", 
          path: "admin/add-product", 
          activeProduct: true,
          formCSS: true,
          productCSS: true 
        })
};

exports.postAddProduct = (req,res,next) => {
    const product=new Product(req.body.title);
    product.save();
     res.redirect("/");
};

exports.getProducts=(req,res,next)=>{
  const products=Product.fetchAll((products)=>{
    res.render('shop',{prods:products,pageTitle:'Shop',path:"/",hasProducts : products.length > 0, activeShoap:true,productCSS:true});
  })
    // const product=adminData.products;
    // res.sendFile(path.join(rootDir,'views','shop.html'));
    // const products=Product.fetchAll();
   
}