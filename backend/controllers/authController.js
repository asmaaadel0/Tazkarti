//login

const login = async (req, res) => {
  res.json({ msg: 'user is log in' });
};

//signup

const signup = async (req, res) => {
  res.json({ msg: 'user is sign up' });
};

module.exports = { login, signup };
