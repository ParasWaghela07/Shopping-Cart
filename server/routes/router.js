const express=require('express');
const router=express.Router();

const {login}=require('../controllers/login');
const {signup}=require('../controllers/signup');
// const {otp}=require('../controllers/otp');

const {addItem,removeItem}=require('../controllers/ItemController');

const {auth}=require('../middlewares/auth');

const {getUserItems}=require('../controllers/getUserItems');

const {sendotp}=require('../controllers/otp');

const {logout}=require('../controllers/logout');

router.post('/login',login);
router.post('/signup',signup);
// router.post('/otp',otp);

router.post('/addItem',auth,addItem);
router.post('/removeItem',auth,removeItem);

router.get('/getUserItems',auth,getUserItems);
router.post('/sendotp',sendotp);

router.get('/checkUserCookie',auth,(req,res)=>{
    res.json({
        success:true,
        message:"WELCOME",
    })
})

router.get('/logout',logout);
module.exports=router;