const express = require("express");
const router = express.Router();

const {
  loginUser,
  registerUser,
  logoutUser,
  confirmEmail,
} = require("../controllers/auth");

const {
  validateRegisterInput,
  validateLoginInput,
} = require("../middleware/validation-middleware");

router.post("/register", validateRegisterInput, registerUser);
router.post("/login", validateLoginInput, loginUser);
router.get("/logout", logoutUser);
router.get("/confirm_email/:confirmationKey", confirmEmail);

module.exports = router;
