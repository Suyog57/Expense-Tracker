const express=require('express');
const {signup,login,dashboard,auth}=require('../controllers/userController');
const router=express.Router();

router.post('/signup',signup);
router.post('/login',login);
router.get('/',dashboard);

module.exports=router;