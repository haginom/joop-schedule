const express = require("express");
const router = express.Router();
const {
  validateUserUpdateInput,
} = require("../middleware/validation-middleware");
const { authorizePermissions } = require("../middleware/authentication");
const {
  getCurrentUser,
  updateUser,
  getApplicationStats,
} = require("../controllers/users");

router.get("/current-user", getCurrentUser);
//admin route
router.get("/admin/app-stats", [
  authorizePermissions("admin"),
  getApplicationStats,
]);
router.patch("/update-user", validateUserUpdateInput, updateUser);
// router.get("/current-user/family", getFamily);

module.exports = router;
