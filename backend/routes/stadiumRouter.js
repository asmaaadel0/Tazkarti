const express = require('express');

const stadiumRouter = express.Router();

const stadiumController = require('../controllers/stadiumController.js');

stadiumRouter.post('/createStadium', stadiumController.createStadium);

stadiumRouter.get('/getStadiums', stadiumController.getStadiums);

module.exports = stadiumRouter;
