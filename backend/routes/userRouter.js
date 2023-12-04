const express = require('express');
const requireAuth = require('../middlewares/requireAuth.js');

const userRouter = express.Router();
// require auth for all the user routes
userRouter.use(requireAuth);

const userController = require('../controllers/userController.js');

//get the usesr data
userRouter.get('/getUser/:id', userController.getUser);
//edit the usesr data
userRouter.patch('/editUser/:id', userController.editUser);
//delete the usesr
userRouter.delete('/deleteUser/:id', userController.deleteUser);
//get the usesr data
userRouter.get('/unAuthorizedUers', userController.getunAunothorizedUsers);

userRouter.patch('/approveUser/:id', userController.approveUser);

//get the usesr data
userRouter.get('/allUsers', userController.getAllUsers);

module.exports = userRouter;
