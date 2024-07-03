const nodemailer = require("nodemailer");
const sgMail = require("@sendgrid/mail");
require("dotenv").config();

const sendEmailWithNodemailer = async (to, subject, html) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    auth: {
      user: "tierra47@ethereal.email", // Replace with your Ethereal email user
      pass: "f9sscFBRJanuxZ1h4C", // Replace with your Ethereal email password
    },
  });

  const info = await transporter.sendMail({
    from: '"Fred Foo 👻" <fredfoo@gmail.com>',
    to,
    subject,
    html,
  });

  return info;
};

const sendEmailWithSendGrid = async (to, subject, html) => {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);

  const msg = {
    to,
    from: "saki.reid@gmail.com", // Replace with verified SendGrid sender email
    subject,
    html,
  };

  const info = await sgMail.send(msg);
  return info;
};

module.exports = {
  sendEmailWithNodemailer,
  sendEmailWithSendGrid,
};

// const sendEmail = async (req, res) => {
//   let testAccount = await nodemailer.createTestAccount();

//   const transporter = nodemailer.createTransport({
//     host: "smtp.ethereal.email",
//     port: 587,
//     auth: {
//       user: "kelsi29@ethereal.email",
//       pass: "762GpdSmKjdG96bRk6",
//     },
//   });

//   let info = await transporter.sendMail({
//     from: '"Fred Foo 👻" <fredfoo@gmail.com>',
//     to: "bar@example.com",
//     subject: "Hello there",

//     html: "<b>Sending emails with Node.js</b>",
//   });

//   res.json({ message: "Email sent", info });
// };

// const sendEmailSendGrid = async (req, res) => {
//   sgMail.setApiKey(process.env.SENDGRID_API_KEY);
//   const msg = {
//     to: "sakireid@icloud.com",
//     from: "saki.reid@gmail.com",
//     subject: "Confirm your email address",
//     text: "and easy to do anywhere, even with Node.js",
//     html: "<strong>and easy to do anywhere, even with Node.js</strong>",
//   };

//   const info = await sgMail.send(msg);
//   res.json({ message: "Email sent", info });
// };

// module.exports = sendEmail;
