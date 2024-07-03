const Family = require("../models/Family");
const AllowedEmail = require("../models/Invited");

const checkInvited = async (email) => {
  try {
    const invitedEmail = await AllowedEmail.findOne({
      email: email,
    });
    return invitedEmail;
  } catch (error) {
    throw new Error(error);
  }
};

const removeInvited = async (email) => {
  try {
    const invitedEmail = await AllowedEmail.findOneAndDelete({
      email,
    });
    return invitedEmail;
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = { checkInvited, removeInvited };
