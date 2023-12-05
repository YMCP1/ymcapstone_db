const express = require('express');
const router = express.Router();

const {loginUser,signupUser, editUser,getAllUsers}=require('../controller/userController')

router.post('/login',loginUser);
router.post('/signup',signupUser);
router.put('/edit/:id',editUser);
router.get('/users',getAllUsers);


module.exports=router