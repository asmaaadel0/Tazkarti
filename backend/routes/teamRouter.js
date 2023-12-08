const express = require('express');

const teamRouter = express.Router();

const teamController = require('../controllers/teamController.js');

teamRouter.get('/getTeams', teamController.getTeams);

teamRouter.get('/getTeamLogo', teamController.getTeamLogo);

module.exports = teamRouter;
