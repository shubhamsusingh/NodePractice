exports.getLogin = (req, res, next) => {
   const cookieHeader = req.get('Cookie') || '';
    let isLoggedIn = false;

    cookieHeader.split(';').forEach(cookie => {
        const [name, value] = cookie.trim().split('=');
        if (name === 'loggedIn' && value === 'true') {
            isLoggedIn = true;
        }
    });

    res.render('auth/login', {
        path: '/login',
        pageTitle: "Login",
        isAuthenticated: isLoggedIn
    });
};

exports.postLogin=(req,res,next)=>{
     res.setHeader('Set-Cookie', 'loggedIn=true; HttpOnly');//secure
    // req.isLoggedIn=true;
    res.redirect('/');
}