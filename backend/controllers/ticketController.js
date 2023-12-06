const ticketModel = require('../models/ticketModel.js');
const Match = require('../models/matchModel.js');

const reserveTicket = async (req, res) => {
  try {
    const matchId = req.body.matchId;
    const seatNumber = req.body.seatNumber;
    const userName = req.body.userName;

    const match = await Match.findById(matchId);
    // console.log(match);
    if (!match) throw Error('no match found to be updated !');
    const seats = match.seats;

    seats.forEach(row => {
      // Loop over each seat in the row
      row.forEach(seat => {
        // Set isReserved to true
        if (seat.number === seatNumber) {
          console.log(seatNumber);
          if (seat.isReserved === true) {
            throw Error("you can't reserve this seat it is already reserved! ");
          } else {
            seat.isReserved = true;
          }
        }
      });
    });

    const match1 = await Match.findOneAndUpdate(
      matchId,
      { seats },
      {
        new: true
      }
    );
    // console.log(match1.seats[0]);

    if (!match1) {
      throw Error('lol !');
    }

    const price = match1.ticketPrice;
    // console.log(matchId);
    // console.log(seatNumber);
    // console.log(userName);
    // console.log(price);
    const ticket = await ticketModel.reserveTicket(
      matchId,
      seatNumber,
      userName,
      price
    );

    return res.status(200).json({
      ticket
    });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};
const getAlltickets = async (req, res) => {
  try {
    const tickets = await ticketModel.getAlltickets(req.body.userName);

    return res.status(200).json({
      tickets
    });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const deleteTicket = async (req, res) => {
  try {
    const _id = req.params.id;
    const ticket1 = await ticketModel.findOne({
      _id,
      userName: req.body.userName
    });
    if (!ticket1)
      throw Error(
        "no ticket found to be deleted by this Id or this ticket isn't belong to this user!"
      );
    const matchId = ticket1.matchId;
    const match = await Match.findById(matchId);
    const seatNumber = ticket1.seatNumber;
    const daysBeforeMatch =
      (match.dateTime.getTime() - Date.now()) / (1000 * 60 * 60 * 24);
    if (daysBeforeMatch < 3)
      throw Error(
        'Cannot cancel a ticket of a match that is less than 3 days away!'
      );
    const seats = match.seats;
    seats.forEach(row => {
      // Loop over each seat in the row
      row.forEach(seat => {
        // Set isReserved to true
        if (seat.number === seatNumber) {
          seat.isReserved = false;
        }
      });
    });

    const match1 = await Match.findOneAndUpdate(
      matchId,
      { seats },
      {
        new: true
      }
    );
    console.log(match1);

    // all is well delete ticket
    const ticket = await ticketModel.deleteTicket(_id);

    return res.status(200).json({
      deletedCount: ticket.deletedCount
    });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

module.exports = {
  reserveTicket,
  getAlltickets,
  deleteTicket
};
