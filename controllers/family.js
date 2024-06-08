const { StatusCodes } = require("http-status-codes");
const Family = require("../models/Family");

const createFamily = async (req, res) => {
  const family = await Family.create({ ...req.body });
  res.status(StatusCodes.CREATED).json({ family });
};

const createMembers = async (req, res) => {
  const familyId = req.params.id;
  const { allowedEmails } = req.body;

  const family = await Family.findOneAndUpdate(
    { _id: familyId },
    { allowedEmails }
  );
  console.log(family);

  res.status(StatusCodes.CREATED).json({ family });
};

const getFamily = async (req, res) => {
  const familyId = req.params.id;
  const family = await Family.findOne({ _id: familyId });

  res.status(StatusCodes.OK).json({ family });
};

//get all families
const getAllFamilies = async (req, res) => {
  const families = await Family.find({});
  res.status(StatusCodes.OK).json({ families });
};

module.exports = {
  createFamily,
  getFamily,
  getAllFamilies,
  createMembers,
};
