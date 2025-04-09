const express=require('express');
const bodyparse=require('body-parser');
const pathImp=require('path');
const expressHbs=require('express-handlebars');



const app=express();

// this is foe handle bars 

// const hbs = expressHbs.create({
//     layoutsDir:'views/layouts',
//     defaultLayout: 'main-layout',
//     extname:'handlebars'  
//  });
 
// app.engine('handlebars', hbs.engine);
// app.set('view engine','handlebars');

// this is for pug
//  app.set('view engine','pug');

// from here ejs start 

app.set('view engine','ejs');
app.set('views','views');

const adminRoutes=require('./routes/admin');
const shopRouts= require('./routes/shop');
const path = require('./utils/path');
const errorController=require('./controllers/error');


app.use(bodyparse.urlencoded({extended:false}));
app.use(express.static(pathImp.join(__dirname,'public')));
// app.use('/',(req,res,next)=>{
   
//     next(); // Allows the request to continue to the next middleware in line
// });
app.use('/admin',adminRoutes);
app.use(shopRouts);

app.use(errorController.get404);

app.listen(3000);

