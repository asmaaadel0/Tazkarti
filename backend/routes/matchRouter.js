const express = require('express');
// const requireAuth = require('../middlewares/requireAuth.js');

const matchRouter = express.Router();
// matchRouter.use('',requireAuth);

const matchController = require('../controllers/matchController.js');

matchRouter.post('/createMatch', matchController.createMatch);

matchRouter.get('/viewMatch/:matchId', matchController.viewMatch);

matchRouter.get('/viewMatches', matchController.viewMatches);

module.exports = matchRouter;
