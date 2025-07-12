const User=require('../models/user');
const bcrypt=require('bcryptjs');
const nodemailer=require('nodemailer');
const sendgridTransport=require('nodemailer-sendgrid-transport');
const crypto=require('crypto');
const { buffer } = require('stream/consumers');
const { where } = require('sequelize');
const { use } = require('react');
const { Op } = require('sequelize');
const { validationResult } = require('express-validator');
const path = require('path');

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
errorMessage:message,
oldInput:{
  email:"",
  password:"",
  confirmPassword:""
}
});
}

exports.postLogin=(req,res,next)=>{
//Cookiew set :-
// res.setHeader('Set-Cookie', 'loggedIn=true; HttpOnly');//secure

//session setting:-
const email=req.body.email;
const password=req.body.password;

const errors=validationResult(req);
if(!errors.isEmpty()){
  return res.status(422).render('auth/login',{
    path:'/login',
    pageTitle:'Login',
    errorMessage:errors.array[0].msg
  });
}
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
const errors=validationResult(req);
if(!errors.isEmpty()){
  console.log(errors.array());
  return res.status(422)
  .render('auth/signup', {
    path: '/signup',
    pageTitle: 'Signup',
    isAuthenticated: false,
    errorMessage:errors.array()[0].msg,
    oldInput:{
  email:email,
  password:password,
  confirmPassword:req.body.confirmPassword
}
    })
}

 bcrypt.hash(password,12)
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

exports.postReset=(req,res,next)=>{
crypto.randomBytes(30,(err,buffer)=>{
    if(err){
        console.log(err);
        return res.redirect('/reset');
    }
    const token=buffer.toString('hex');
    console.log("this is token",token);
    User.findOne({where:{email:req.body.email}})
    .then(user=>{
        if(!user){
            req.flash('error','No Account with that email found.');
            return res.redirect('/reset');
        }
        user.resetToken=token;
        user.resetTokenExpiration=Date.now()+3600000;
        return user.save();
    })
    .then(result=>{
        res.redirect('/');
        return transporter.sendMail({
        to: req.body.email,
        from: 'singhshubham68738@gmail.com',
        subject: 'password reset',
       html: `
         <p>You requested a password reset</p>
         <p>Click this <a href="http://localhost:3000/reset/${token}"><h1>Click Here</h1></a> to set a new password.</p>
        `

    })
    .then(() => {
        console.log("✅ Reset-Link sent successfully");
    })
    .catch(err => {
        console.log("❌ Failed to send Reset-Link:", err);
    });

    })
    .catch(err=>{
        console.log(err);
    });
});
}

exports.getNewPassword = (req,res,next)=>{
  const token=req.params.token;
  User.findOne({
    where: {
      resetToken: token,
      resetTokenExpiration: {
        [Op.gt]: Date.now()
      }
    }
  })
  .then(user=>{
    console.log("token=",token);
    console.log("user email=",user.email);
let message=req.flash('error');
if(message.length>0){
    message=message[0];
}else{
    message=null;
}
res.render('auth/new-password', {
path: '/new-password',
pageTitle: "New Password",
isAuthenticated: req.session.isLoggedIn || false,
errorMessage:message,
userId:user.id.toString(),
token:token
});
  })
  .catch(err=>{
    console.log(err);
  })
    
}
exports.postNewPassword=(req,res,next)=>{
    const newPassword = req.body.password;
    const userId=req.body.userId;
    const token=req.body.token;
    let resetUser;
     User.findOne({
    where: {
      resetToken: token,
      resetTokenExpiration: {
        [Op.gt]: Date.now()
      },
      id:userId
    }
  })
  .then(user=>{
    resetUser=user;
    return bcrypt.hash(newPassword,12);
  })
  .then(hashedPassword=>{
    resetUser.password=hashedPassword;
    resetUser.resetToken=null;
    resetUser.resetTokenExpiration=null;
    return resetUser.save();
  })
  .then(result=>{
    res.redirect('/login');
  })
  .catch(err=>{
    console.log(err);
  })

}
