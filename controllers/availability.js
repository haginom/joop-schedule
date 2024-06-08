const { StatusCodes } = require("http-status-codes");
const Availability = require("../models/Availability");

const getAllAvailability = async (req, res) => {
  const availability = await Availability.find({
    createdBy: req.user.userId,
  });

  res.status(StatusCodes.OK).json({ availability });
};

const getSingleAvailability = async (req, res) => {
  const { id } = req.params;

  const availability = await Availability.findOne({
    _id: id,
  });

  res.status(StatusCodes.OK).json({ availability });
};

const createAvailability = async (req, res) => {
  const { availability } = req.body;
  const parsedAvailability = JSON.parse(availability);

  const user = req.user.userId;

  //Iterate over the availability array and create a new document for each availability
  const savedAvailabilities = await Promise.all(
    parsedAvailability.map(async (avail) => {
      console.log("Processing");

      const existingAvailability = await Availability.findOne({
        createdBy: user,
        date: avail.date,
      });

      if (existingAvailability) {
        existingAvailability.slots = avail.slots;
        return existingAvailability.save();
      } else {
        console.log("availability does not exist");
        const newAvailability = new Availability({
          createdBy: user,
          date: avail.date,
          slots: avail.slots,
        });
        return newAvailability.save();
      }
    })
  );

  res.status(StatusCodes.CREATED).json({ savedAvailabilities });
};

const updateAvailability = async (req, res) => {
  res.send("Update Availability");
};

const deleteAvailability = async (req, res) => {
  res.send("Delete Availability");
};

module.exports = {
  getAllAvailability,
  getSingleAvailability,
  createAvailability,
  deleteAvailability,
};
