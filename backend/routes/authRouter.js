const express = require('express');

const authRouter = express.Router();

const authController = require('../controllers/authController.js');

//login
authRouter.post('/login', authController.login);

//sign up
authRouter.post('/signup', authController.signup);

module.exports = authRouter;
