const mongoose = require("mongoose");
const { Schema } = mongoose;

const SlotSchema = new Schema({
  type: { type: String, enum: ["morning", "afternoon"], required: true },
  available: {
    type: String,
    enum: ["yes", "no", "maybe", "not available"],
    default: "not available",
    required: true,
  },
});

const AvailabilitySchema = new Schema(
  {
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    date: {
      type: Date,
      required: [true, "Please provide a date"],
    },
    slots: [SlotSchema],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Availability", AvailabilitySchema);
