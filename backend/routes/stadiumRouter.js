const express = require('express');
const requireAuth = require('../middlewares/requireAuth.js');

const stadiumRouter = express.Router();
stadiumRouter.use('/createStadium', requireAuth);

const stadiumController = require('../controllers/stadiumController.js');

stadiumRouter.post('/createStadium', stadiumController.createStadium);

stadiumRouter.get('/getStadiums', stadiumController.getStadiums);

module.exports = stadiumRouter;
