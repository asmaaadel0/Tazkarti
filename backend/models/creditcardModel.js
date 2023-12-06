const mongoose = require('mongoose');

const creditcardSchema = new mongoose.Schema({
  creditCardNumber: {
    type: String,
    required: true,
    minlength: 16,
    maxlength: 16,
    match: /^[0-9]+$/
  },
  pin: {
    type: String,
    required: true,
    minlength: 4,
    maxlength: 4,
    match: /^[0-9]+$/
  }
});

const creditcarModel = mongoose.model('Creditcard', creditcardSchema);

module.exports = creditcarModel;
