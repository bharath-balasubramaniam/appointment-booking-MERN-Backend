const mongoose = require("mongoose");
const timeSlotSchema = mongoose.Schema(
  {
    date: {
      type: String,
    },
    shift: {
      type: Array,
    },
    fromTime: {
      type: Number,
    },
    toTime: {
      type: Number,
    },
  },
  { timeStamps: true }
);
const TimeSlot = mongoose.model("TimeSlot", timeSlotSchema);
module.exports = TimeSlot;
