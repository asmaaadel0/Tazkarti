const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');

const requireAuth = async (req, res, next) => {
  //verify authentication
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json({ error: 'Authorization token is required !' });
  }
  const token = authorization.split(' ')[1];

  try {
    const { _id } = jwt.verify(token, process.env.SECRET);
    req.user = await userModel.findOne({ _id }).select('_id');
    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({ error: 'Request is not Authorized!' });
  }
};

module.exports = requireAuth;
