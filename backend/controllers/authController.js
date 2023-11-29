//login
const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');

const createToken = _id => {
  return jwt.sign({ _id: _id }, process.env.SECRET, { expiresIn: '3d' });
};

const login = async (req, res) => {
  const { userName, password } = req.body;
  try {
    const user = await userModel.login(userName, password);
    const token = createToken(user._id);
    res.status(200).json({ userName, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//signup

const signup = async (req, res) => {
  const {
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
  } = req.body;
  try {
    const user = await userModel.signup(
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
    );
    const token = createToken(user._id);
    res.status(200).json({ userName, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
  // res.json({ msg: 'user is sign up' });
};

module.exports = { login, signup };
