const { StatusCodes } = require("http-status-codes");
const UnauthenticatedError = require("../errors/unauthenticated");

const User = require("../models/User");

const registerUser = async (req, res) => {
  const isFirstAccount = (await User.countDocuments()) === 0;
  req.body.role = isFirstAccount ? "admin" : "user";
  const user = await User.create({ ...req.body });
  const token = user.createJWT();

  res
    .status(StatusCodes.CREATED)
    .json({ user: { name: user.name, role: user.role }, token });
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  console.log(user);

  // if (!user) {
  //   throw new UnauthenticatedError("Invalid credentials");
  // }
  // const isPasswordMatch = await user.matchPasswords(password);

  // if (!isPasswordMatch) {
  //   throw new UnauthenticatedError("Invalid credentials");
  // }

  const isValidUser = user && (await user.matchPasswords(password));

  if (!isValidUser) {
    throw new UnauthenticatedError("Invalid credentials");
  }

  const token = user.createJWT();

  const oneDayInMs = 24 * 60 * 60 * 1000;

  res.cookie("token", token, {
    httpOnly: true,
    expires: new Date(Date.now() + oneDayInMs),
    secure: process.env.NODE_ENV === "production",
  });

  res.status(StatusCodes.OK).json({ msg: "user logged in" });
};

const logoutUser = async (req, res) => {
  res.cookie("token", "logout", {
    httpOnly: true,
    expires: new Date(Date.now()),
  });

  res.status(StatusCodes.OK).json({ msg: "user logged out" });
};

module.exports = { registerUser, loginUser, logoutUser };
