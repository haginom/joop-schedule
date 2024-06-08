const express = require("express");
const router = express.Router();

const { loginUser, registerUser, logoutUser } = require("../controllers/auth");

const {
  validateRegisterInput,
  validateLoginInput,
} = require("../middleware/validation-middleware");

router.post("/register", validateRegisterInput, registerUser);
router.post("/login", validateLoginInput, loginUser);
router.get("/logout", logoutUser);

module.exports = router;
