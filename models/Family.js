const mongoose = require("mongoose");
const { Schema } = mongoose;

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

  allowedEmails: [
    {
      type: Schema.Types.ObjectId,
      ref: "AllowedEmail",
    },
  ],
  parents: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
});

FamilySchema.pre("save", async function (next) {
  try {
    if (!this.$isNew) {
      return next();
    }
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

FamilySchema.pre("findOneAndUpdate", async function (next) {
  try {
    //check if the email already exists
    const emailToAdd = this.getUpdate().$addToSet.allowedEmails.$each;
    //if email already exists, return an error

    const existingEmail = await this.model.findOne({
      _id: this.getQuery()._id,
      allowedEmails: { $in: emailToAdd },
    });

    if (existingEmail) {
      const error = new Error("Email already exists");
      return next(error);
    }

    //if more than 2 emails, return an error
    const family = await this.model.findOne({ _id: this.getQuery()._id });
    if (family.allowedEmails.length >= 2) {
      const error = new Error("Only two emails are allowed");
      return next(error);
    }

    next();
  } catch (error) {
    next(error);
  }
});

const Family = mongoose.model("Family", FamilySchema);

module.exports = Family;
