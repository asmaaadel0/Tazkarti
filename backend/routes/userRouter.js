const express = require('express');

const userRouter = express.Router();

// const userController = require('../controllers/userController.js');
const authController = require('../controllers/authController.js');

//login
userRouter.post('/login', authController.login);

//sign up
userRouter.post('/signup', authController.signup);

//get all the usesr
// userRouter.get('/', userController.getAllUsers);

module.exports = userRouter;
