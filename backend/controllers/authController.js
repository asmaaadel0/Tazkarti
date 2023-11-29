//login

const userModel = require('../models/userModel');

const login = async (req, res) => {
  res.json({ msg: 'user is log in' });
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
    res.status(200).json({ userName, user });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
  res.json({ msg: 'user is sign up' });
};

module.exports = { login, signup };
