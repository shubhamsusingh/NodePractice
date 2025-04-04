const express=require('express');
const bodyparse=require('body-parser');

const app=express();
app.use(bodyparse.urlencoded({extended:false}));
app.use('/',(req,res,next)=>{
   
    next(); // Allows the request to continue to the next middleware in line
});
app.use('/add-product',(req,res,next)=>{
   
    res.send('<h1>Add product </h1><form action="/product" method="POST"><input type="text" name="title"></input><button type="submit">Submit</button></form>')
    
})
app.use('/product',(req,res,next)=>{
    const data=req.body;
    console.log(data);
   res.redirect("/");
    
})
app.use('/',(req,res,next)=>{
    
    res.send('<h1>Helllo response from node</h1>')
    
})
app.listen(3000);

