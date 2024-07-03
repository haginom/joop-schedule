require("dotenv").config();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const { Schema } = mongoose;

const emergencyContactSchema = new Schema({
  name: {
    type: String,
    required: [true, "Please provide a name"],
    minLength: 3,
    maxLength: 30,
  },
  lastName: {
    type: String,
    required: [true, "Please provide a last name"],
    minLength: 3,
    maxLength: 50,
  },
  relation: {
    type: String,
    required: [true, "Please provide a relation"],
    minLength: 3,
    maxLength: 50,
  },
  phoneNumber: {
    type: String,
    required: [true, "Please provide a phone number"],
    minLength: 10,
    maxLength: 10,
  },
});

const ChildSchema = new Schema({
  firstName: {
    type: String,
    required: [true, "Please provide a name"],
    minLength: 3,
    maxLength: 30,
  },
  lastName: {
    type: String,
    required: [true, "Please provide a last name"],
    minLength: 3,
    maxLength: 50,
  },
  dateOfBirth: {
    type: Date,
    required: [true, "Please provide a date of birth"],
  },
  emergencyContact: [emergencyContactSchema],
});

const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide a name"],
      minLength: 3,
      maxLength: 30,
    },
    lastName: {
      type: String,
      required: [true, "Please provide a last name"],
      minLength: 3,
      maxLength: 50,
    },
    email: {
      type: String,
      required: [true, "Please provide an email"],
      match: [
        /^([\w-\.]+)?@\w+([\.-]?\w+)*(\.\w{2,4})+$/,
        "Please provide a valid email",
      ],
      unique: true,
    },
    confirmationKey: {
      type: String,
      minLength: 64,
      maxLength: 64,
    },
    confirmationExpiry: {
      type: Date,
    },
    confirmed: {
      type: Boolean,
      default: false,
    },
    password: {
      type: String,
      required: [true, "Please provide a password"],
      minLength: 6,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    family: {
      type: Schema.Types.ObjectId,
      ref: "Family",
    },

    children: [ChildSchema],
  },
  { timestamps: true }
);

UserSchema.pre("save", async function () {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  this.confirmationKey = await bcrypt.hash(this.confirmationKey, salt);
});

UserSchema.methods.createJWT = function () {
  return jwt.sign(
    { userId: this._id, name: this.name, role: this.role },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_LIFETIME,
    }
  );
};

UserSchema.methods.createConfirmationJWT = function () {
  return jwt.sign({ userId: this._id }, process.env.EMAIL_SECRET, {
    expiresIn: process.env.JWT_LIFETIME,
  });
};

UserSchema.methods.matchPasswords = async function (candidatePassword) {
  const isMatch = await bcrypt.compare(candidatePassword, this.password);
  return isMatch;
};

UserSchema.methods.toJSON = function () {
  const userObject = this.toObject();
  delete userObject.password;
  return userObject;
};

module.exports = mongoose.model("User", UserSchema);
