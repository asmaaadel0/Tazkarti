const userModel = require('../models/userModel');

const getUser = async (req, res) => {
  const { userName } = req.body;
  try {
    const user = await userModel.getUser(userName);
    // return res.status(200).json({ userName, token });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

module.exports = { getUser };
