const path=require('path');
const express=require('express');
const rootDir=require('../utils/path');

const router=express.Router();
const products=[];

router.get('/add-product',(req,res,next)=>{
   
    // res.send('<h1>Add product </h1><form action="/product" method="POST"><input type="text" name="title"></input><button type="submit">Submit</button></form>')
    // res.sendFile(path.join(rootDir,'views','add-product.html'));
    res.render("add-product",{pageTitle:"Add-Product",path:"admin/add-product"})
})
router.post('/product',(req,res,next)=>{
    // const data=req.body;
    // console.log(data);
    products.push({title:req.body.title});
   res.redirect("/",{pageTitle:"Shop"});
    
})
// module.exports=router;
exports.routes=router;
exports.products=products;