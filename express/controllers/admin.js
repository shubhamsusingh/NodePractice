const Product = require('../models/products');
exports.getAddProduct = (req, res, next) => {
    // res.send('<h1>Add product </h1><form action="/product" method="POST"><input type="text" name="title"></input><button type="submit">Submit</button></form>')
    // res.sendFile(path.join(rootDir,'views','add-product.html'));
    res.render("admin/add-product", 
        { pageTitle: "Add-Product", 
          path: "admin/add-product", 
          activeProduct: true,
          formCSS: true,
          productCSS: true 
        })
};

exports.postAddProduct = (req,res,next) => {
  const title=req.body.title;
  const ImageUrl=req.body.ImageUrl;
  const price=req.body.price;
  const description=req.body.description;
  const product=new Product(title,ImageUrl,price,description);
    product.save();
     res.redirect("/");
};
exports.getProducts=(req,res,next)=>{
  // res.render('admin/products',{
  //   path:'admin/products',
  //   pageTitle:'Admin Products'
  // })
  Product.fetchAll((products)=>{
    res.render('admin/products',{prods:products,pageTitle:'Admin Products',path:"admin/products",hasProducts : products.length > 0, activeShoap:true,productCSS:true});
  })
}