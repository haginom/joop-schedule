const nodemailer = require("nodemailer");
const sgMail = require("@sendgrid/mail");

const sendEmail = async (req, res) => {
  let testAccount = await nodemailer.createTestAccount();

  const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    auth: {
      user: "kelsi29@ethereal.email",
      pass: "762GpdSmKjdG96bRk6",
    },
  });

  let info = await transporter.sendMail({
    from: '"Fred Foo 👻" <fredfoo@gmail.com>',
    to: "bar@example.com",
    subject: "Hello there",

    html: "<b>Sending emails with Node.js</b>",
  });

  res.json({ message: "Email sent", info });
};

const sendEmailSendGrid = async (req, res) => {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  const msg = {
    to: "sakireid@icloud.com",
    from: "saki.reid@gmail.com",
    subject: "Sending with SendGrid is Fun",
    text: "and easy to do anywhere, even with Node.js",
    html: "<strong>and easy to do anywhere, even with Node.js</strong>",
  };

  const info = await sgMail.send(msg);
  res.json({ message: "Email sent", info });
};

module.exports = sendEmail;
