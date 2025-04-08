const express=require('express');
const bodyparse=require('body-parser');
const pathImp=require('path');
const expressHbs=require('express-handlebars');



const app=express();
const hbs = expressHbs.create({
    defaultLayout: false  // Disable the default layout
 });
 
app.engine('handlebars', hbs.engine);
// app.set('view engine','pug');
app.set('view engine','handlebars');
app.set('views','views');

// const adminData=require('./routes/admin');
// const shopRouts= require('./routes/shop');
const path = require('./utils/path');


app.use(bodyparse.urlencoded({extended:false}));
app.use(express.static(pathImp.join(__dirname,'public')));
// app.use('/',(req,res,next)=>{
   
//     next(); // Allows the request to continue to the next middleware in line
// });
// app.use('/admin',adminData.routes);
// app.use(shopRouts);

app.use((req,res,next)=>{
    // res.status(404).send('<h1>Page not found</h1>')
    // res.sendFile(pathImp.join(__dirname,'views','404.html'));
    res.render("404",{pageTitle:"404"});
})

app.listen(3000);

