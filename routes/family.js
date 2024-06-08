const express = require("express");
const router = express.Router();

const {
  getFamily,
  createMembers,
  createFamily,
  getAllFamilies,
} = require("../controllers/family");
const { authorizePermissions } = require("../middleware/authentication");

router.get("/families/:id", getFamily);
router.post("/families/:id/members", [
  authorizePermissions("admin"),
  createMembers,
]);
router.get("/all-families", getAllFamilies);
router.post("/", [authorizePermissions("admin"), createFamily]);

module.exports = router;
