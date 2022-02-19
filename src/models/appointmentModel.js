const mongoose = require("mongoose");
const appointmentSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    isBooked: {
      type: Boolean,
    },
    timeslot: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "TimeSlot",
    },
  },
  { timestamps: true }
);

const Appointment = mongoose.model("Appointment", appointmentSchema);

module.exports = Appointment;
