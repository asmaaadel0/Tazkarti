const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema({
  matchId: { type: String, required: true },
  seatNumbers: { type: [String], required: true },
  userName: { type: String, required: true },
  price: { type: Number, required: true }
});

ticketSchema.statics.reserveTicket = async function(
  matchId,
  seatNumbers,
  userName,
  price
) {
  if (!matchId || !seatNumbers || !userName || !price) {
    throw Error('this fields is required !');
  }
  const ticket = await this.create({
    matchId,
    seatNumbers,
    userName,
    price
  });

  return ticket;
};

ticketSchema.statics.getAlltickets = async function(userName) {
  const tickets = await this.find({ userName });
  if (!tickets) {
    throw Error('no  tickets was found for this user !');
  }

  return tickets;
};
ticketSchema.statics.deleteTicket = async function(_id) {
  const ticket = await this.deleteOne({ _id });
  if (!ticket) {
    throw Error('no ticket found to be deleted !');
  }

  return ticket;
};

const ticketModel = mongoose.model('Ticket', ticketSchema);

module.exports = ticketModel;
