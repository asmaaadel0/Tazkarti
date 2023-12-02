const express = require('express');

const userRouter = express.Router();

const userController = require('../controllers/userController.js');
const authController = require('../controllers/authController.js');

//login
userRouter.post('/login', authController.login);

//sign up
userRouter.post('/signup', authController.signup);

//get the usesr data
userRouter.get('/getMe', userController.getUser);

module.exports = userRouter;
