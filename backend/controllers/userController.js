const userModel = require('../models/userModel');

const getUser = async (req, res) => {
  const id = req.params.id;
  try {
    const user = await userModel.getUser(id);

    return res.status(200).json({
      user
    });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const deleteUser = async (req, res) => {
  const id = req.params.id;
  try {
    const user = await userModel.deleteUser(id);

    return res.status(200).json({
      deletedCount: user.deletedCount
    });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const editUser = async (req, res) => {
  const id = req.params.id;
  try {
    const user = await userModel.editUser(id, req.body);

    return res.status(200).json({
      user
    });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};
const getunAunothorizedUsers = async (req, res) => {
  try {
    const users = await userModel.getunAunothorizedUsers();
    return res.status(200).json({
      users
    });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};
const approveUser = async (req, res) => {
  const id = req.params.id;
  try {
    const user = await userModel.approveUser(id);
    return res.status(200).json({
      user
    });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await userModel.getAllUsers();
    return res.status(200).json({
      users
    });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};
module.exports = {
  getUser,
  deleteUser,
  editUser,
  getunAunothorizedUsers,
  approveUser,
  getAllUsers
};
