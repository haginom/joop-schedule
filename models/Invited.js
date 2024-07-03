const mongoose = require("mongoose");
const { Schema } = mongoose;

const AllowedEmailSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  role: {
    type: String,
    enum: ["admin", "user"],
    required: true,
  },
});

const AllowedEmail = mongoose.model("AllowedEmail", AllowedEmailSchema);

module.exports = AllowedEmail;
