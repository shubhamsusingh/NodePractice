const User=require('../models/user');
const bcrypt=require('bcryptjs');
exports.getLogin = (req, res, next) => {
    console.log("Login page hit. Session loggedIn?", req.session.isLoggedIn);
    res.render('auth/login', {
        path: '/login',
        pageTitle: "Login",
        isAuthenticated: req.session.isLoggedIn || false
    });
};

exports.getSignup=(req,res,next)=>{
   res.render('auth/signup', {
    path: '/signup',
    pageTitle: 'Signup',
    isAuthenticated: false
  });
}

exports.postLogin=(req,res,next)=>{
    //Cookiew set :-
    //  res.setHeader('Set-Cookie', 'loggedIn=true; HttpOnly');//secure

    //session setting:-
    User.findByPk(1)
    .then(user => {
      req.session.isLoggedIn = true;
      req.session.user = user;
      req.session.save(err=>{
        console.log(err);
        res.redirect('/');
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