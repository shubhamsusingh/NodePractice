const express=require('express');
const bodyparse=require('body-parser');


const app=express();

const adminRoutes=require('./routes/admin');
const shopRouts= require('./routes/shop');


app.use(bodyparse.urlencoded({extended:false}));
// app.use('/',(req,res,next)=>{
   
//     next(); // Allows the request to continue to the next middleware in line
// });
app.use('/admin',adminRoutes);
app.use(shopRouts);

app.use((req,res,next)=>{
    res.status(404).send('<h1>Page not found</h1>')
})

app.listen(3000);

