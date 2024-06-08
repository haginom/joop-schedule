const express = require("express");
const router = express.Router();

const {
  getAllAvailability,
  getSingleAvailability,
  createAvailability,
  deleteAvailability,
} = require("../controllers/availability");

router.route("/").get(getAllAvailability).post(createAvailability);
router.route("/:id").get(getSingleAvailability).delete(deleteAvailability);

module.exports = router;
