const { StatusCodes } = require("http-status-codes");
const Family = require("../models/Family");
const AllowedEmail = require("../models/Invited");

const createFamily = async (req, res) => {
  const family = await Family.create({ ...req.body });
  res.status(StatusCodes.CREATED).json({ family });
};

const createMembers = async (req, res) => {
  const familyId = req.params.id;
  const { emailToAdd } = req.body;

  const allowedEmailIds = await Promise.all(
    emailToAdd.map(async (emailToAdd) => {
      let allowedEmail = await AllowedEmail.findOne({
        email: emailToAdd.email,
      });
      if (!allowedEmail) {
        allowedEmail = new AllowedEmail({
          email: emailToAdd.email,
          role: emailToAdd.role,
        });
        await allowedEmail.save();
      }
      return allowedEmail._id;
    })
  );

  const family = await Family.findOneAndUpdate(
    { _id: familyId },
    { $addToSet: { allowedEmails: { $each: allowedEmailIds } } },
    { new: true }
  );

  res.status(StatusCodes.CREATED).json({ family });
};

const deleteMember = async (req, res) => {
  const { id, memberId } = req.params;
  const family = await Family.findOne({ _id: id });

  const allowedEmail = family.allowedEmails.find(
    (email) => email._id.toString() === memberId
  );
  family.allowedEmails.pull(allowedEmail._id);

  await family.save();

  const familyCount = await Family.countDocuments({
    allowedEmails: allowedEmail._id,
  });

  if (familyCount === 0) await AllowedEmail.findByIdAndDelete(allowedEmail._id);

  res.status(StatusCodes.OK).json({ allowedEmail });
};

// const getMembers = async (req, res) => {
//   const familyId = req.params.id;
//   const family = await res.status(StatusCodes.OK).json({ family });
// };

const getFamily = async (req, res) => {
  const familyId = req.params.id;
  const family = await Family.findOne({ _id: familyId }).populate(
    "allowedEmails"
  );

  res.status(StatusCodes.OK).json({ family });
};

//get all families
const getAllFamilies = async (req, res) => {
  const families = await Family.find({}).populate("allowedEmails");
  res.status(StatusCodes.OK).json({ families });
};

module.exports = {
  createFamily,
  getFamily,
  getAllFamilies,
  createMembers,
  deleteMember,
};
