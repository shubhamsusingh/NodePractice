const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const session=require('express-session');
const MySQLStore = require('express-mysql-session')(session);

const errorController = require('./controllers/error');
const sequelize= require('./util/database');
const Product = require('./models/product');
const User = require('./models/user'); 
const Cart = require('./models/cart');
const CartItem = require('./models/cart-item');
const Order = require('./models/order');
const OrderItem = require('./models/order-item');
const csrf=require('csurf');
const flash=require('connect-flash');
const multer=require('multer');

const app = express();
const store = new MySQLStore({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'root',
    database: 'node-complete'
});

const csrfProtection=csrf();
const fileStorage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'images');
    },
    filename:(req,file,cb)=>{
         const sanitizedFilename = new Date().toISOString().replace(/:/g, '-') + '-' + file.originalname;
    cb(null, sanitizedFilename);
    }
});
const fileFilter=(req,file,cb)=>{
    if(file.mimetype==='image/png'||file.mimetype==='image/jpg'||file.mimetype==='image/jpeg'){
        cb(null,true);
    }else{
        cb(null,false);
    }
}
app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const authRoutes = require('./routes/auth');
const { name } = require('ejs');
const { error } = require('console');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(multer({storage:fileStorage,fileFilter:fileFilter}).single('image'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({secret:'my secret',resave:false,saveUninitialized:false, store:store}));
app.use(csrfProtection);
app.use(flash());


app.use((req,res,next)=>{
    res.locals.isAuthenticated=req.session.isLoggedIn;
    res.locals.csrfToken=req.csrfToken();
    next();
})

app.use((req, res, next) => { 
    
    if(!req.session.user){
        return next();
    } 
    User.findByPk(req.session.user.id)
    .then(user => {
        if(!user){
            return next();
        }
      req.user = user;
      next();
    })
    .catch(err =>
        next(new Error(err))
        );});
        
app.use('/admin', adminRoutes);
app.use(shopRoutes);
app.use(authRoutes);
app.get('/500',errorController.get500);
app.use(errorController.get404);
app.use((error,req,res,next)=>{
    res.status(500).render('500', {
     pageTitle: 'Error!', 
     path: '/500',
     isAuthenticated:req.session.isLoggedIn ,
      csrfToken: req.csrfToken ? req.csrfToken() : '',
    });
})
Product.belongsTo(User,{constraints:true,onDelete:'CASCADE'});
User.hasMany(Product);
User.hasOne(Cart);
Cart.belongsTo(User);
Cart.belongsToMany(Product,{through:CartItem});
Product.belongsToMany(Cart,{through:CartItem});
Order.belongsTo(User);
User.hasMany(Order);
Order.belongsToMany(Product,{ through : OrderItem });

app.listen(3000);



