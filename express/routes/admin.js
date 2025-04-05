const path=require('path');
const express=require('express');
const rootDir=require('../utils/path');

const router=express.Router();

router.get('/add-product',(req,res,next)=>{
   
    // res.send('<h1>Add product </h1><form action="/product" method="POST"><input type="text" name="title"></input><button type="submit">Submit</button></form>')
    res.sendFile(path.join(rootDir,'views','add-product.html'));
})
router.post('/product',(req,res,next)=>{
    const data=req.body;
    console.log(data);
   res.redirect("/");
    
})
module.exports=router;