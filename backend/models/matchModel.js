const mongoose = require('mongoose');

const matchSchema = new mongoose.Schema({
  homeTeam: {
    type: String,
    required: true
  },
  awayTeam: {
    type: String,
    required: true
  },
  venue: {
    type: String,
    required: true
  },
  dateTime: {
    type: Date,
    required: true
  },
  mainReferee: {
    type: String,
    required: true
  },
  firstLinesman: {
    type: String,
    required: true
  },
  secondLinesman: {
    type: String,
    required: true
  },
  ticketPrice: {
    type: Number,
    required: true
  }
});

const matchModel = mongoose.model('Match', matchSchema);

module.exports = matchModel;
