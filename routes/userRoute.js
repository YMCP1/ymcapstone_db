const express = require('express');
const router = express.Router();
const reqAuth = require('../middleware/requireauth')
const {loginUser,signupUser, editUser,getAllUsers,getSingleUser,deleteUser}=require('../controller/userController')


router.post('/login',loginUser);
router.post('/signup',signupUser);
router.put('/edit/:id',editUser);
router.get('/users',getAllUsers);
router.get('/users/:id',getSingleUser)
router.delete('/users/:id',deleteUser)

module.exports=router