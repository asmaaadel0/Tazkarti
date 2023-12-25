const mongoose = require('mongoose');
const Match = require('../models/matchModel');
const Stadium = require('../models/stadiumModel');

const createMatch = async (req, res) => {
  const { homeTeam } = req.body;
  const { awayTeam } = req.body;
  const { venue } = req.body;
  const { dateTime } = req.body;
  const { mainReferee } = req.body;
  const { firstLinesman } = req.body;
  const { secondLinesman } = req.body;
  const { ticketPrice } = req.body;

  // validations on the new match data
  if (homeTeam === awayTeam) {
    return res.status(406).send({ msg: 'Two teams can not be the same' });
  }

  if (
    mainReferee === firstLinesman ||
    mainReferee === secondLinesman ||
    firstLinesman === secondLinesman
  ) {
    return res.status(406).send({ msg: 'Referees should be different' });
  }

  const matchDate = new Date(dateTime);
  if (matchDate <= new Date()) {
    return res.status(406).send({ msg: 'Match should be in the future' });
  }

  if (parseInt(ticketPrice, 10) <= 0) {
    return res
      .status(406)
      .send({ msg: 'Ticket price should be larger than 0' });
  }

  const stadium = await Stadium.findOne({ name: venue });
  if (!stadium) {
    return res.status(400).send({ err: 'The stadium does not exist' });
  }

  // validations on existing matches
  const twelveHoursAgo = new Date(matchDate.getTime() - 12 * 60 * 60 * 1000);
  const twelveHoursLater = new Date(matchDate.getTime() + 12 * 60 * 60 * 1000);
  // console.log(twelveHoursAgo, '\n', dateTime, '\n', twelveHoursLater);

  const existingMatches = await Match.find({
    dateTime: {
      $gte: twelveHoursAgo,
      $lte: twelveHoursLater
    }
  });

  // eslint-disable-next-line no-restricted-syntax
  for (const match of existingMatches) {
    if (homeTeam === match.homeTeam || homeTeam === match.awayTeam)
      return res.status(406).send({ msg: 'Home team is not available' });

    if (awayTeam === match.homeTeam || awayTeam === match.awayTeam)
      return res.status(406).send({ msg: 'Away team is not available' });

    if (mainReferee === match.mainReferee)
      return res.status(406).send({ msg: 'Main Referee is not available' });

    if (
      firstLinesman === match.firstLinesman ||
      firstLinesman === match.secondLinesman
    )
      return res.status(406).send({ msg: 'First Linesman is not available' });

    if (
      secondLinesman === match.firstLinesman ||
      secondLinesman === match.secondLinesman
    )
      return res.status(406).send({ msg: 'Second Linesman is not available' });

    if (venue === match.venue)
      return res.status(406).send({ msg: 'Venue is not available' });
  }

  // create empty seats for the new match
  const seats = [];
  for (let i = 0; i < stadium.rows; i++) {
    const rowNumber = String.fromCharCode('A'.charCodeAt(0) + i);
    const row = [];

    for (let j = 1; j <= stadium.rowSeats; j++) {
      const seatNumber = rowNumber + j;
      row.push({
        number: seatNumber,
        isReserved: false
      });
    }
    seats.push(row);
  }

  const match = new Match({
    homeTeam,
    awayTeam,
    venue,
    dateTime,
    mainReferee,
    firstLinesman,
    secondLinesman,
    ticketPrice,
    seats
  });
  match
    .save()
    .then(result => {
      res.status(200).send({ msg: 'Match added successfully!' });
    })
    .catch(err => {
      res.status(500).send({ err: err.message });
      console.log(err);
    });
};
///////////////////////////////////////////////////////////////////////////////////////
const editMatch = async (req, res) => {
  const { matchId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(matchId)) {
    console.log(matchId);
    return res.status(400).send({ err: 'Invalid match ID format.' });
  }

  let match;
  try {
    match = await Match.findById(matchId);
    if (!match)
      return res.status(404).send({ err: 'No matches for the given Id.' });

    const { homeTeam } = req.body;
    const { awayTeam } = req.body;
    const { venue } = req.body;
    const { dateTime } = req.body;
    const { mainReferee } = req.body;
    const { firstLinesman } = req.body;
    const { secondLinesman } = req.body;
    const { ticketPrice } = req.body;
    let seats = match.seats;

    if (homeTeam === awayTeam) {
      return res.status(406).send({ msg: 'Two teams can not be the same' });
    }
    if (
      mainReferee === firstLinesman ||
      mainReferee === secondLinesman ||
      firstLinesman === secondLinesman
    ) {
      return res.status(406).send({ msg: 'Referees should be different' });
    }
    const matchDate = new Date(dateTime);
    if (matchDate <= new Date()) {
      return res.status(406).send({ msg: 'Match should be in the future' });
    }
    if (match.ticketPrice !== ticketPrice) {
      return res.status(406).send({ msg: "Ticket price can't be changed" });
    }

    // validations on existing matches
    const twelveHoursAgo = new Date(matchDate.getTime() - 12 * 60 * 60 * 1000);
    const twelveHoursLater = new Date(
      matchDate.getTime() + 12 * 60 * 60 * 1000
    );
    // console.log(twelveHoursAgo, '\n', dateTime, '\n', twelveHoursLater);

    const existingMatches = await Match.find({
      _id: { $ne: mongoose.Types.ObjectId(matchId) },
      dateTime: {
        $gte: twelveHoursAgo,
        $lte: twelveHoursLater
      }
    });

    // eslint-disable-next-line no-restricted-syntax
    for (const mat of existingMatches) {
      if (homeTeam === mat.homeTeam || homeTeam === mat.awayTeam)
        return res.status(406).send({ msg: 'Home team is not available' });

      if (awayTeam === mat.homeTeam || awayTeam === mat.awayTeam)
        return res.status(406).send({ msg: 'Away team is not available' });

      if (mainReferee === mat.mainReferee)
        return res.status(406).send({ msg: 'Main Referee is not available' });

      if (
        firstLinesman === mat.firstLinesman ||
        firstLinesman === mat.secondLinesman
      )
        return res.status(406).send({ msg: 'First Linesman is not available' });

      if (
        secondLinesman === mat.firstLinesman ||
        secondLinesman === mat.secondLinesman
      )
        return res
          .status(406)
          .send({ msg: 'Second Linesman is not available' });

      if (venue === mat.venue)
        return res.status(406).send({ msg: 'Venue is not available' });
    }

    // if stadium has changed, make new empty seats
    if (match.venue !== venue) {
      const stadium = await Stadium.findOne({ name: venue });
      if (!stadium) {
        return res.status(400).send({ err: 'The stadium does not exist' });
      }
      //
      const newStadiumRows = stadium.rows;
      const newStadiumRowSeats = stadium.rowSeats;

      const oldStadium = await Stadium.findOne({ name: match.venue });
      const oldStadiumRows = oldStadium.rows;
      const oldStadiumRowSeats = oldStadium.rowSeats;

      const elementsInOldNotInNew = [];

      for (let i = 0; i < oldStadiumRows; i++) {
        for (let j = 0; j < oldStadiumRowSeats; j++) {
          if (i >= newStadiumRows || j >= newStadiumRowSeats) {
            elementsInOldNotInNew.push(seats[i][j]);
          }
        }
      }

      const isReservedNew = elementsInOldNotInNew.some(
        element => element.isReserved
      );
      if (isReservedNew === true) {
        // there are reserved seats in cancelled seats
        return res
          .status(400)
          .send({ err: 'There are reserved seats in cancelled seats' });
      }
      const newSeats = [];
      for (let i = 0; i < newStadiumRows; i++) {
        const row = [];
        const rowNumber = String.fromCharCode('A'.charCodeAt(0) + i);

        if (i >= oldStadiumRows) {
          for (let j = 1; j <= newStadiumRowSeats; j++) {
            const seatNumber = rowNumber + j;
            row.push({
              number: seatNumber,
              isReserved: false
            });
          }
        } else {
          for (let j = 1; j <= newStadiumRowSeats; j++) {
            const seatNumber = rowNumber + j;
            if (j > oldStadiumRowSeats)
              row.push({
                number: seatNumber,
                isReserved: false
              });
            else row.push(seats[i][j - 1]);
          }
        }
        newSeats.push(row);
      }
      seats = newSeats;
    }

    const updatedMatch = {
      homeTeam,
      awayTeam,
      venue,
      dateTime,
      mainReferee,
      firstLinesman,
      secondLinesman,
      ticketPrice,
      seats
    };
    try {
      await Match.findByIdAndUpdate(matchId, updatedMatch, {
        new: true
      }).then(result => {
        res.status(200).send({ msg: 'Match edited successfully!' });
      });
    } catch (error) {
      console.error(error);
    }
  } catch (err) {
    return res.status(500).send({ err: err.msg });
  }
};

const viewMatch = async (req, res) => {
  const { matchId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(matchId)) {
    console.log(matchId);
    return res.status(400).send({ err: 'Invalid match ID format.' });
  }

  let match;
  try {
    match = await Match.findById(matchId);
    if (!match)
      return res.status(404).send({ err: 'No matches for the given Id.' });
  } catch (err) {
    return res.status(500).send({ err: err.msg });
  }

  match = { ...match.toObject() };
  res.status(200).send(match);
};

const viewMatches = async (req, res) => {
  let matches;
  const currentDate = new Date();

  try {
    matches = await Match.find({ dateTime: { $gt: currentDate } }).sort({
      dateTime: 1
    });
  } catch (err) {
    return res.status(500).send({ err: err.message });
  }

  matches = matches.map(match => {
    return { ...match.toObject() };
  });

  res.status(200).send({
    matches: matches
  });
};

module.exports = { createMatch, editMatch, viewMatch, viewMatches };
