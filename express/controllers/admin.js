const { where } = require('sequelize');
const Product = require('../models/product');
const {validationResult}=require('express-validator');

exports.getAddProduct = (req, res, next) => {
  res.render('admin/edit-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    editing: false,
    hasError:false,
    errorMessage:null,
    validationErrors:[]
  });
};

exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  // const product = new Product(null, title, imageUrl, description, price);
  // product.save();
  const errors=validationResult(req);
  if(!errors.isEmpty()){
    return res.status(422).render('admin/edit-product', {
      pageTitle: 'Add Product',
      path: '/admin/edit-product',
      editing: false,
      product: {
        title:title,
        imageUrl:imageUrl,
        price:price,
        description:description,
      },
       hasError:true,
       errorMessage:errors.array()[0].msg,
       validationErrors:errors.array()
    });
  }
  req.user.createProduct({
  title: title,
  price: price,
  imageUrl: imageUrl,
  description: description,
  
  
})
.then(result => {
  console.log('Product Created');
  res.redirect('/');
})
.catch(err => {
  console.log(err);
});

};

exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect('/');
  }
  const prodId = req.params.productId;
  // Product.findByPk(prodId)
  req.user.getProducts({where:{id:prodId}})
  .then(products=>{
    const product=products[0];
     if (!product) {
      return res.redirect('/');
    }
    res.render('admin/edit-product', {
      pageTitle: 'Edit Product',
      path: '/admin/edit-product',
      editing: editMode,
      product: product,
      isAuthenticated: req.session.isLoggedIn,
      hasError:false,
      errorMessage:null,
      validationErrors:[]
    });
  })
  .catch(err=>{
    console.log(err);
  })
 
};

exports.postEditProduct = (req, res, next) => {
  const prodId = req.body.productId;
  const updatedTitle = req.body.title;
  const updatedPrice = req.body.price;
  const updatedImageUrl = req.body.imageUrl;
  const updatedDesc = req.body.description;
  Product.findByPk(prodId)
  .then(product=>{
    if(product.userId!=req.user.id){
      return res.redirect('/');
    }
     const errors=validationResult(req);
  if(!errors.isEmpty()){
    return res.status(422).render('admin/edit-product', {
      pageTitle: 'edit Product',
      path: '/admin/edit-product',
      editing: true,
      product: {
        title:updatedTitle,
        imageUrl:updatedImageUrl,
        price:updatedPrice,
        description:updatedDesc,
        product: product,
      },
       hasError:true,
       errorMessage:errors.array()[0].msg,
       validationErrors:errors.array()
    });
  }
    product.title=updatedTitle;
    product.price=updatedPrice;
    product.imageUrl=updatedImageUrl;
    product.description=updatedDesc;
   return product.save().then(result=>{
    console.log('UPDATED PRODUCT!');
    res.redirect('/admin/products');
  })
  })
  
  .catch(err=>{
    console.log(err);
  })
    
  
  
};

exports.getProducts = (req, res, next) => {
  req.user.getProducts().then(products=>{
    res.render('admin/products', {
      prods: products,
      pageTitle: 'Admin Products',
      path: '/admin/products',
      isAuthenticated: req.session.isLoggedIn
    });
  }).catch(err=>{
    console.log(err)
  });
  // Product.fetchAll(products => {
  //   res.render('admin/products', {
  //     prods: products,
  //     pageTitle: 'Admin Products',
  //     path: '/admin/products'
  //   });
  // });
};

exports.postDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;

  Product.findByPk(prodId)
    .then(product => {
      if (product.userId != req.user.id) {
        return res.redirect('/');
      }
      return Product.destroy({ where: { id: prodId } });
    })
    .then(result => {
      console.log(result);
      res.redirect('/admin/products');
    })
    .catch(err => {
      console.log(err);
      res.redirect('/admin/products');
    });
};

