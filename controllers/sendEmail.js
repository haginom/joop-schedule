const {
  sendEmailWithNodemailer,
  sendEmailWithSendGrid,
} = require("../utils/sendEmail");

const sendEmailWithNodemailerRoute = async (req, res) => {
  try {
    const { to, subject, html } = req.body;
    const info = await sendEmailWithNodemailer(to, subject, html);
    res.json({ message: "Email sent with Nodemailer", info });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error sending email with Nodemailer", error });
  }
};

const sendEmailWithSendGridRoute = async (req, res) => {
  try {
    const { to, subject, html } = req.body;
    const info = await sendEmailWithSendGrid(to, subject, html);
    res.json({ message: "Email sent with SendGrid", info });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error sending email with SendGrid", error });
  }
};

module.exports = {
  sendEmailWithNodemailerRoute,
  sendEmailWithSendGridRoute,
};
