const mongoose = require("mongoose");
const { Schema } = mongoose;

const AllowedEmailSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: function (emails) {
        // Check for uniqueness
        const uniqueEmails = Array.from(new Set(emails));
        return uniqueEmails.length === emails.length;
      },
      message: "Allowed emails must be unique.",
    },
  },
  role: {
    type: String,
    enum: ["admin", "user"],
    required: true,
  },
});

const FamilySchema = new Schema({
  childName: {
    type: String,
    required: [true, "Please provide a family name"],
    minLength: 3,
    maxLength: 30,
  },
  childLastName: {
    type: String,
    required: [true, "Please provide a last name"],
    minLength: 3,
    maxLength: 50,
  },
  childDoB: {
    type: Date,
    required: [true, "Please provide a date of birth"],
  },
  startDate: {
    type: Date,
    required: [true, "Please provide a start date"],
  },

  allowedEmails: [AllowedEmailSchema],

  parents: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
});

FamilySchema.pre("save", async function (next) {
  try {
    const family = this;
    const existingFamily = await mongoose.model("Family").findOne({
      childDoB: family.childDoB,
      childName: family.childName,
      childLastName: family.childLastName,
    });
    if (existingFamily) {
      const error = new Error(
        "Child with this name and date of birth already exists"
      );
      return next(error);
    }
    next();
  } catch (error) {
    next(error);
  }
});

FamilySchema.pre("findOneAndUpdate", function (next) {
  if (this._update.allowedEmails && this._update.allowedEmails.length > 2) {
    const error = new Error("Only two emails are allowed");
    return next(error);
  }
  //check that the emails are unique
  if (this._update.allowedEmails && this._update.allowedEmails.length === 2) {
    const uniqueEmails = new Set(
      this._update.allowedEmails.map((email) => email.email)
    );
    if (uniqueEmails.size !== 2) {
      const error = new Error("Allowed emails must be unique");
      return next(error);
    }
  }

  next();
});

const Family = mongoose.model("Family", FamilySchema);

module.exports = Family;
