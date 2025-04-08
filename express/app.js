const express=require('express');
const bodyparse=require('body-parser');
const pathImp=require('path');



const app=express();

const adminRoutes=require('./routes/admin');
const shopRouts= require('./routes/shop');
const path = require('./utils/path');


app.use(bodyparse.urlencoded({extended:false}));
app.use(express.static(pathImp.join(__dirname,'public')));
// app.use('/',(req,res,next)=>{
   
//     next(); // Allows the request to continue to the next middleware in line
// });
app.use('/admin',adminRoutes);
app.use(shopRouts);

app.use((req,res,next)=>{
    // res.status(404).send('<h1>Page not found</h1>')
    res.sendFile(pathImp.join(__dirname,'views','404.html'));
})

app.listen(3000);

