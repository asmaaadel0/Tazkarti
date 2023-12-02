const express = require('express');

const matchRouter = express.Router();

const matchController = require('../controllers/matchController.js');

matchRouter.post('/createMatch', matchController.createMatch);

matchRouter.get('/viewMatch/:matchId', matchController.viewMatch);

matchRouter.get('/viewMatches', matchController.viewMatches);

module.exports = matchRouter;
