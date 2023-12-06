const express = require('express');
const requireAuth = require('../middlewares/requireAuth.js');

const ticketRouter = express.Router();
// require auth for all the user routes
ticketRouter.use(requireAuth);

const ticketController = require('../controllers/ticketController.js');

ticketRouter.post('/reserveTicket', ticketController.reserveTicket);
ticketRouter.get('/allTickets/:userName', ticketController.getAlltickets);
ticketRouter.delete('/deleteTicket/:id', ticketController.deleteTicket);

module.exports = ticketRouter;
