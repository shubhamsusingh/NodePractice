const User=require('../models/user');
const bcrypt=require('bcryptjs');
const nodemailer=require('nodemailer');
const sendgridTransport=require('nodemailer-sendgrid-transport');
require('dotenv').config();
const transporter = nodemailer.createTransport(sendgridTransport({
    auth: {
        api_key: process.env.SENDGRID_API_KEY
    }
}));
exports.getLogin = (req, res, next) => {
console.log("Login page hit. Session loggedIn?", req.session.isLoggedIn);
let message=req.flash('error');
if(message.length>0){
    message=message[0];
}else{
    message=null;
}
res.render('auth/login', {
path: '/login',
pageTitle: "Login",
isAuthenticated: req.session.isLoggedIn || false,
errorMessage:message
});
};

exports.getSignup=(req,res,next)=>{
    let message=req.flash('error');
    if(message.length>0){
        message=message[0];
    }else{
        message=null;
    }
res.render('auth/signup', {
path: '/signup',
pageTitle: 'Signup',
isAuthenticated: false,
errorMessage:message
});
}

exports.postLogin=(req,res,next)=>{
//Cookiew set :-
// res.setHeader('Set-Cookie', 'loggedIn=true; HttpOnly');//secure

//session setting:-
const email=req.body.email;
const password=req.body.password;
User.findOne({where:{email:email}})
.then(user => {
if(!user){
    req.flash('error','invalid user or Password Please Check');
return res.redirect('/login');
}
bcrypt.compare(password,user.password)
.then(doMatch=>{
if(doMatch){
req.session.isLoggedIn = true;
req.session.user = user;
return req.session.save(err=>{
res.redirect('/');
})
}
req.flash('error','invalid Password Please check');
res.redirect('/login');
})
.catch(err=>{
console.log(err);
res.redirect('/login');
})

})
.catch(err => console.log(err));
}

exports.postSignup = (req, res, next) => {
const email=req.body.email;
const password=req.body.password;
const confirmPassword=req.body.confirmPassword;
User.findOne({ where: { email: email } })
.then(userDoc=>{
if(userDoc){
req.flash('error','Email already available');
return res.redirect('/signup');
}
return bcrypt.hash(password,12)
.then(hashPassword=>{
const user =new User({
email:email,
password:hashPassword
});
return user.save();
})
.then(result=>{
    result.createCart();
   res.redirect('/login');
   console.log("Attempting to send signup confirmation email...");
return transporter.sendMail({
    to: 'singhsidhanshu771@gmail.com',
    from: 'singhshubham68738@gmail.com',
    subject: 'Signup succeeded',
    html: '<h1>You successfully signed up!</h1>'
})
.then(() => {
    console.log("✅ Email sent successfully");
})
.catch(err => {
    console.log("❌ Failed to send email:", err);
});


})
})
.catch(err=>{
console.log(err);
})
};
exports.postLogout=(req,res,next)=>{
req.session.destroy(err=>{
console.log(err);
res.redirect('/');
})
}
exports.getReset=(req,res,next)=>{
let message=req.flash('error');
if(message.length>0){
    message=message[0];
}else{
    message=null;
}
res.render('auth/reset', {
path: '/reset',
pageTitle: "Reset Password",
isAuthenticated: req.session.isLoggedIn || false,
errorMessage:message
});
}
