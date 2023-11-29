const mongoose = require('mongoose');
const becrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    unique: true,
    minlength: 5,
    maxlength: 50,
    lowercase: true,
    required: [true, 'Please tell us your username!']
  },
  password: { type: String, required: true, minlength: 5, maxlength: 1024 },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  birthDate: { type: Date, required: true },
  gender: { type: String, enum: ['male', 'female'], required: true },
  city: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 15,
    lowercase: true
  },
  address: { type: String, default: '' },
  emailAddress: { type: String, required: true, lowercase: true, unique: true },
  role: {
    type: String,
    enum: ['manager', 'fan', 'admin'],
    required: true
  },
  isPending: { type: Boolean, default: true, required: true },
  createdIn: { type: Date, default: Date.now, required: true }
});

//signup
userSchema.statics.signup = async function(
  userName,
  password,
  firstName,
  lastName,
  birthDate,
  gender,
  city,
  address,
  emailAddress,
  role
) {
  const exists = await this.findOne({ userName });

  if (exists) {
    throw Error('this username already exists!');
  }
  const saltRounds = 10;
  const salt = await becrypt.genSalt(saltRounds);
  const hash = await becrypt.hash(password.toString(), salt);
  const user = await this.create({
    userName,
    password: hash,
    firstName,
    lastName,
    birthDate,
    gender,
    city,
    address,
    emailAddress,
    role
  });

  return user;
};

const userModel = mongoose.model('User', userSchema);

module.exports = userModel;
