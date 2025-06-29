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
    req.session.isLoggedIn=true;
    
   req.session.save(err => {
    if (err) {
      console.log("Session save error:", err);
    }
    res.redirect('/');
  });
}
exports.postLogout=(req,res,next)=>{
   req.session.destroy(err=>{
    console.log(err);
    res.redirect('/');
   })
}