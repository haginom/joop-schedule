const express = require("express");
const router = express.Router();

const {
  sendEmailWithNodemailerRoute,
  sendEmailWithSendGridRoute,
} = require("../controllers/sendEmail");

// router.post("/", sendEmail);
// router.get("/confirm_email/:confirmationKey", sendEmail);
router.post("/send-nodemailer", sendEmailWithNodemailerRoute);
router.post("/send-sendgrid", sendEmailWithSendGridRoute);

module.exports = router;
