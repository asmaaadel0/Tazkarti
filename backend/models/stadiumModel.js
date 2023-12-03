const mongoose = require('mongoose');

const stadiumSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  rows: {
    type: Number,
    required: true,
    min: 1,
    max: 10
  },
  rowSeats: {
    type: Number,
    required: true,
    min: 5,
    max: 10
  }
});

const stadiumModel = mongoose.model('Stadium', stadiumSchema, 'stadiums');

module.exports = stadiumModel;
