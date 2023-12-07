const mongoose = require('mongoose');
const becrypt = require('bcrypt');
const validator = require('validator');

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
  if (
    !userName ||
    !password ||
    !firstName ||
    !lastName ||
    !birthDate ||
    !gender ||
    !city ||
    !emailAddress ||
    !role
  ) {
    throw Error('this fields is required');
  }
  if (!validator.isEmail(emailAddress)) {
    throw Error('Email is not valid');
  }
  const exists = await this.findOne({ userName });
  if (exists) {
    throw Error('this username already exists!');
  }
  const Emailexists = await this.findOne({ emailAddress });
  if (Emailexists) {
    throw Error('this email already exists!');
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

userSchema.statics.login = async function(userName, password) {
  if (!userName || !password) {
    throw Error('this fields is required');
  }

  const user = await this.findOne({ userName });
  if (!user) {
    throw Error('incorrect userName !');
  }
  if (user.role !== 'admin' && user.isPending === true)
    throw Error(
      " you can't login now you aren't authorized yet by the admin yet ! "
    );
  console.log(user.role);
  const match = await becrypt.compare(password.toString(), user.password);
  console.log(match);
  if (!match) {
    throw Error('incorrect password !');
  }
  return user;
};

userSchema.statics.getUser = async function(_id) {
  const user = await this.findOne({ _id });
  if (!user) {
    throw Error('no user found !');
  }

  return user;
};

userSchema.statics.editUser = async function(_id, body) {
  const user = await this.findOneAndUpdate({ _id }, body, { new: true });
  if (!user) {
    throw Error('no user found to be updated !');
  }

  return user;
};
userSchema.statics.deleteUser = async function(_id) {
  const user = await this.deleteOne({ _id });
  if (!user) {
    throw Error('no user found to be deleted !');
  }

  return user;
};

userSchema.statics.getunAunothorizedUsers = async function() {
  const rolesToFind = ['manager', 'fan'];
  const user = await this.find({ isPending: true, role: { $in: rolesToFind } });
  // const user = await this.find({ isPending: true });
  if (!user) {
    throw Error('no pending users  found !');
  }

  return user;
};

userSchema.statics.approveUser = async function(_id) {
  const user = await this.findOneAndUpdate(
    { _id },
    { isPending: false },
    { new: true }
  );
  if (!user) {
    throw Error('no user  found !');
  }

  return user;
};

userSchema.statics.getAllUsers = async function() {
  const rolesToFind = ['manager', 'fan'];
  const users = await this.find({ role: { $in: rolesToFind } });
  // const users = await this.find();
  if (!users) {
    throw Error('no users found !');
  }

  return users;
};
const userModel = mongoose.model('User', userSchema);

module.exports = userModel;
