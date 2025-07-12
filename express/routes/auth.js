const express=require('express');
const router=express.Router();
const authController=require('../controllers/auth');
const { check, body } = require('express-validator');


router.get('/login',authController.getLogin);
router.get('/signup',authController.getSignup);
router.post('/login',authController.postLogin);
router.post('/logout',authController.postLogout);
router.post('/signup',[check('email').isEmail().withMessage('Please enter valid Email').custom((value,{req})=>{
    if(value=="sidhanshu@2003.gmail.com"){
throw new Error('This Email is forbidden');
    }
     return true;
    
}),body('password','Please eneter a password with only number and text and at least 5 character.').isLength({min:5}).isAlphanumeric()],authController.postSignup);
router.get('/reset',authController.getReset);
router.post('/reset',authController.postReset);
router.get('/reset/:token',authController.getNewPassword);
router.post('/new-password',authController.postNewPassword);

module.exports=router;