const express = require('express');
const requireAuth = require('../middlewares/requireAuth.js');

const matchRouter = express.Router();
matchRouter.use('/createMatch', requireAuth);
matchRouter.use('/editMatch', requireAuth);

const matchController = require('../controllers/matchController.js');

matchRouter.post('/createMatch', matchController.createMatch);
matchRouter.put('/editMatch/:matchId', matchController.editMatch);

matchRouter.get('/viewMatch/:matchId', matchController.viewMatch);

matchRouter.get('/viewMatches', matchController.viewMatches);

module.exports = matchRouter;
