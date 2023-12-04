const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema({
  matchId: { type: String, required: true },
  seatNumber: { type: String, required: true },
  userName: { type: String, required: true },
  price: { type: Number, required: true }
});

ticketSchema.statics.reserveTicket = async function(
  matchId,
  seatNumber,
  userName,
  price
) {
  if (!matchId || !seatNumber || !userName || !price) {
    throw Error('this fields is required !');
  }
  const ticket = await this.create({
    matchId,
    seatNumber,
    userName,
    price
  });

  return ticket;
};

const ticketModel = mongoose.model('Ticket', ticketSchema);

module.exports = ticketModel;
