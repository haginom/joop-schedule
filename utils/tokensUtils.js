const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const createJWT = (payload) => {
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_LIFETIME,
  });
  return token;
};

const verifyJWT = (token) => {
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  return decoded;
};

const generateConfirmationKey = () => {
  return new Promise((resolve, reject) => {
    crypto.randomBytes(48, (err, buffer) => {
      if (err) {
        return reject(err);
      }
      const key = buffer.toString("base64");
      resolve(key);
    });
  });
};

module.exports = { createJWT, verifyJWT, generateConfirmationKey };
