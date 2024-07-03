const express = require("express");
const router = express.Router();

const {
  deleteMember,
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
router.delete("/families/:id/members/:memberId", [
  authorizePermissions("admin"),
  deleteMember,
]);

router.get("/all-families", getAllFamilies);
router.post("/", [authorizePermissions("admin"), createFamily]);

module.exports = router;
