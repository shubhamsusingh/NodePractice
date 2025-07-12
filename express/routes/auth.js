const express=require('express');
const router=express.Router();
const authController=require('../controllers/auth');
const { check, body } = require('express-validator');
const User=require('../models/user');


router.get('/login',authController.getLogin);
router.get('/signup',authController.getSignup);
router.post('/login',authController.postLogin);
router.post('/logout',authController.postLogout);
router.post('/signup',
[check('email').isEmail().withMessage('Please enter valid Email').custom((value,{req})=>{
   return User.findOne({ where: { email: value } })
    .then(userDoc=>{
    if(userDoc){
    return Promise.reject('E-mail exists already , pick a diffrent One.');
   }
}); 
}),
body('password','Please eneter a password with only number and text and at least 5 character.').isLength({min:5}).isAlphanumeric(),
body('confirmPassword').custom((value,{req})=>{
    if(value!==req.body.password){
        throw new Error('Password have to match');
    }
    return true;
})
],
authController.postSignup);
router.get('/reset',authController.getReset);
router.post('/reset',authController.postReset);
router.get('/reset/:token',authController.getNewPassword);
router.post('/new-password',authController.postNewPassword);

module.exports=router;