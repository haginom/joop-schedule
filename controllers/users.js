const { StatusCodes } = require("http-status-codes");
const User = require("../models/User");

const getCurrentUser = async (req, res) => {
  console.log(req.user.userId);

  const user = await User.findOne({ _id: req.user.userId });

  const userWithoutPassword = user.toJSON();
  res.status(StatusCodes.OK).json({ user: userWithoutPassword });
};

const updateUser = async (req, res) => {
  const obj = { ...req.body };
  delete obj.password;
  const updatedUser = await User.findByIdAndUpdate(req.user.userId, obj);
  res.status(StatusCodes.OK).json({ msg: "update user" });
};

//admin route
const getApplicationStats = async (req, res) => {
  const users = await User.find({});

  res.status(StatusCodes.OK).json({ users });
};

module.exports = { getCurrentUser, getApplicationStats, updateUser };
