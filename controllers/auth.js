const { StatusCodes } = require("http-status-codes");
const UnauthenticatedError = require("../errors/unauthenticated");
const { checkInvited, removeInvited } = require("../utils/checkInvited");
const { generateConfirmationKey, createJWT } = require("../utils/tokensUtils");
const { sendEmailWithNodemailer } = require("../utils/sendEmail");
const User = require("../models/User");
const Family = require("../models/Family");
const jwt = require("jsonwebtoken");

const registerUser = async (req, res) => {
  const isFirstAccount = (await User.countDocuments()) === 0;
  req.body.role = isFirstAccount ? "admin" : "user";

  const { email } = req.body;

  const invitedEmail = await checkInvited(email);

  if (!invitedEmail && !isFirstAccount) {
    throw new UnauthenticatedError("Your email is not valid to register");
  }

  const confirmationKey = await generateConfirmationKey();
  const confirmationExpiry = Date.now() + 30 * 24 * 60 * 60 * 1000;

  const user = await User.create({
    ...req.body,
    confirmationKey,
    confirmationExpiry,
  });

  const token = user.createJWT();
  const emailToken = user.createConfirmationJWT();

  const baseUrl = process.env.BASE_URL;
  const confirmationLink = `${baseUrl}/auth/confirm_email/${emailToken}`;

  const info = await sendEmailWithNodemailer(
    email,
    "Confirm your email address",
    `<a href="${confirmationLink}">Click here to confirm</a>`
  );

  res
    .status(StatusCodes.CREATED)
    .json({ user: { name: user.name, role: user.role }, token, emailToken });
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

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

const confirmEmail = async (req, res) => {
  const { confirmationKey } = req.params;

  const user = jwt.verify(confirmationKey, process.env.EMAIL_SECRET);

  const updatedUser = await User.findOneAndUpdate(
    { _id: user.userId },
    {
      confirmed: true,
      confirmationKey: "",
      confirmationExpiry: "",
    }
  );

  console.log(updatedUser);

  // if (!updateUser) {
  //   throw new UnauthenticatedError("Invalid confirmation key");
  // }

  //remove user from invited list
  await removeInvited(updatedUser.email);

  //remove user from allowed email list in family
  const family = await Family.findOne({ _id: updatedUser._id });
  console.log(family);

  if (family) {
    family.allowedEmails.pull(user._id);
    family.parents.push(user._id);
    await family.save();
  }
  // family.allowedEmails.pull(user._id);
  // family.parents.push(user._id);
  // await family.save();

  res.status(StatusCodes.OK).json({ msg: "Email confirmed", user });
};

module.exports = { registerUser, loginUser, logoutUser, confirmEmail };
