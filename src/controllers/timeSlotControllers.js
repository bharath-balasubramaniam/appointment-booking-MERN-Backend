const asyncHandler = require("express-async-handler");
const TimeSlot = require("../models/timeSlotModel");
const moment = require("moment");
///Create a  new time slot ///
const createTimeSlots = asyncHandler(async (req, res) => {
  let { date, shift, fromTime } = req.body;
  let t_date = moment(date).format("YYYY-MM-DD");
  let f_time = moment(fromTime).format("Hmm") * 1;
  let t_time = moment(fromTime + 60000 * 30).format("Hmm") * 1;
  if (!date || !shift || !fromTime) {
    res.status(400);
    throw new Error("Please select all the fields");
  }
  const ifSlot = await TimeSlot.findOne({ date: t_date });
  if (ifSlot) {
    const ValidateTime = await TimeSlot.find({
      date: t_date,
      $or: [
        { fromTime: { $gte: f_time, $lte: t_time } },
        { toTime: { $gte: f_time, $lte: t_time } },
      ],
    });
    if (ValidateTime[0]) {
      {
        res.status(400);
        throw new Error("one slot already exist. please change your fromtime");
      }
    }
  }
  const slot = await TimeSlot.create({
    date: t_date,
    shift,
    fromTime: f_time,
    toTime: t_time,
  });
  if (slot) {
    return res.status(200).json({
      _id: slot._id,
      date: slot.date,
      shift: slot.shift[0],
      fromTime: slot.fromTime,
      toTime: slot.toTime,
    });
  } else {
    res.status(400);
    throw new Error("Error whilecreating Time slot");
  }
});

///Get  a time slot
const getTimeSlot = asyncHandler(async (req, res) => {
  try {
    const slot = await TimeSlot.findById(req.params.id);
    res.status(200).json(slot);
  } catch (error) {
    res.status(500).json(error.message);
  }
});
/// Get all the time slots
const allTimeSlots = asyncHandler(async (req, res) => {
  const qDate = req.query.date;
  const qShift = req.query.shift;
  try {
    let timeSlots;
    if (qDate) {
      if (qShift) {
        timeSlots = await TimeSlot.find({
          date: qDate,
          shift: qShift,
        });
        res.status(200).json(timeSlots);
      } else {
        timeSlots = await TimeSlot.find({ date: qDate }).exec();
        return res.status(200).json(timeSlots);
      }
    } else {
      timeSlots = await TimeSlot.find();
      return res.status(200).json(timeSlots);
    }
  } catch (error) {
    res.status(500).json(error.message);
  }
});
///Delete a  time slot
const deleteTimeSlot = asyncHandler(async (req, res) => {
  try {
    await TimeSlot.findByIdAndDelete(req.params.id);
    res.status(204).json("Product has been deleted!");
  } catch (error) {
    res.status(500).json(error.message);
  }
});
module.exports = { createTimeSlots, getTimeSlot, allTimeSlots, deleteTimeSlot };
