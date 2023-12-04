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

    // seats.forEach(seat => {
    //   if (seat.number == seatNumber) {
    //     seat.isReserved = true;
    //   }
    // });
    // console.log(seats);
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

module.exports = {
  reserveTicket
};
