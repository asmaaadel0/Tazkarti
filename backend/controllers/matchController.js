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
    const seats = match.seats;

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

// const viewMatches = async (req, res) => {
//   const perPage = 6;

//   if (!req.query.page || req.query.page < 1) {
//     return res
//       .status(406)
//       .send({ err: 'Invalid page number, it must be greater than 0' });
//   }

//   const { page } = req.query;

//   let matches;
//   let totalMatchesNumber;
//   const currentDate = new Date();

//   try {
//     matches = await Match.find({ dateTime: { $gt: currentDate } })
//       .sort({ dateTime: 1 })
//       .skip((page - 1) * perPage)
//       .limit(perPage);

//     totalMatchesNumber = await Match.countDocuments({
//       dateTime: { $gt: currentDate }
//     });
//   } catch (err) {
//     return res.status(500).send({ err: err.message });
//   }

//   matches = matches.map(match => {
//     return { ...match.toObject() };
//   });

//   const hasNext = (page - 1) * perPage + matches.length < totalMatchesNumber;
//   res.status(200).send({
//     has_next: hasNext,
//     matches: matches
//   });
// };

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
