const User=require('../models/user');
exports.getLogin = (req, res, next) => {
    console.log("Login page hit. Session loggedIn?", req.session.isLoggedIn);
    res.render('auth/login', {
        path: '/login',
        pageTitle: "Login",
        isAuthenticated: req.session.isLoggedIn || false
    });
};

exports.postLogin=(req,res,next)=>{
    //Cookiew set :-
    //  res.setHeader('Set-Cookie', 'loggedIn=true; HttpOnly');//secure

    //session setting:-
    User.findByPk(1)
    .then(user => {
      req.session.isLoggedIn = true;
      req.session.user = user;
      res.redirect('/');
    })
    .catch(err => console.log(err));
}
exports.postLogout=(req,res,next)=>{
   req.session.destroy(err=>{
    console.log(err);
    res.redirect('/');
   })
}