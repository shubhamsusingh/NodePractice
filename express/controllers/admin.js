const Product = require('../models/products');


exports.getAddProduct = (req, res, next) => {
    // res.send('<h1>Add product </h1><form action="/product" method="POST"><input type="text" name="title"></input><button type="submit">Submit</button></form>')
    // res.sendFile(path.join(rootDir,'views','add-product.html'));
    res.render("admin/edit-product", 
        { pageTitle: "Add-Product", 
          path: "admin/add-product", 
          editing:false
          
        })
};

exports.postAddProduct = (req,res,next) => {
  const title=req.body.title;
  const ImageUrl=req.body.ImageUrl;
  const price=req.body.price;
  const description=req.body.description;
  const product=new Product(null,title,ImageUrl,price,description);
    product.save();
     res.redirect("/");
};
exports.getEditProduct = (req, res, next) => {
 const editMode=req.query.edit;
 if(!editMode){
return  res.redirect('/');
 }

 const prodId = req.params.productId;
 
 Product.fetchById(prodId,product => {
  if(!product){
    return res.redirect('/');
  }
  res.render("admin/edit-product", 
    { pageTitle: "edit-Product", 
      path: "/admin/edit-product", 
      editing:editMode,
      product:product
    })
 })
  
};

exports.postEditProduct = (req,res,next)=>{
  const prodId=req.body.productId;
  const updatedTitle=req.body.title;
  const updatedImageUrl=req.body.ImageUrl;
  const updatedPrice=req.body.price;
  const updatedDescription=req.body.description;
  const updatedProduct=new Product(prodId,updatedTitle,updatedImageUrl,updatedPrice,updatedDescription);
  updatedProduct.save();
  res.redirect('/admin/products');
}
exports.getProducts=(req,res,next)=>{
  // res.render('admin/products',{
  //   path:'admin/products',
  //   pageTitle:'Admin Products'
  // })
  Product.fetchAll((products)=>{
    res.render('admin/products',{prods:products,pageTitle:'Admin Products',path:"admin/products",hasProducts : products.length > 0, activeShoap:true,productCSS:true});
  })
}
exports.deleteProducts=(req,res,next)=>{
  const prodId=req.body.productId;
  Product.deleteById(prodId);
  console.log(prodId);
  res.redirect("/admin/products");
}