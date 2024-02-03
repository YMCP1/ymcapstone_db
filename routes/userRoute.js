const express = require('express');
const router = express.Router();
const {
  loginUser,
  signupUser,
  editUser,
  getAllUsers,
  getSingleUser,
  deleteUser,
} = require("../controller/userController");
const requireAuth = require('../middleware/requireauth');


router.post('/login',loginUser);
router.post('/signup',signupUser);
router.put('/edit/:id',editUser);
router.get('/users',requireAuth,getAllUsers);
router.get("/users/:id", requireAuth, getSingleUser),
  router.delete("/users/:id", deleteUser);

module.exports=router