const asyncHandler = require("express-async-handler");
const Appointment = require("../models/appointmentModel");
const User = require("../models/userModel");
const TimeSlot = require("../models/timeSlotModel");

///  create an Appointment
const createAppointment = asyncHandler(async (req, res) => {
  const { booked, timeslotId } = req.body;
  if (!booked || !timeslotId) {
    return res.status(400).json("Invalid data passed into request");
  }
  let newAppointment = {
    user: req.user._id,
    isBooked: booked,
    timeslot: timeslotId,
  };
  try {
    let ifAppointment = await Appointment.find({ timeslot: timeslotId });
    console.log(ifAppointment);
    if (ifAppointment) {
      res.status(500);
      throw new Error(
        "This Appointment was already chosen by someone. please select some other appointment"
      );
    }
    let appointment = await Appointment.create(newAppointment);
    appointment = await appointment.populate("user", "name email pic contact");
    appointment = await appointment.populate("timeslot");
    res.status(200).json(appointment);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});
/// get an Appointment
const getAppointment = asyncHandler(async (req, res) => {
  try {
    let appointment = await Appointment.findById(req.params.id);
    return res.status(200).json(appointment);
  } catch (error) {
    res.status(500).json(error.message);
  }
});
/// get All Appointment
const getAllAppointments = asyncHandler(async (req, res) => {
  try {
    const appointments = await Appointment.find();
    return res.status(200).json(appointments);
  } catch (error) {
    res.status(500).json(error.message);
  }
});

/// delete an Appointment
const deleteAppointment = asyncHandler(async (req, res) => {
  try {
    await Appointment.findByIdAndDelete(req.params.id);
    return res.status(204).json("Appointment has been deleted!");
  } catch (error) {
    res.status(500).json(error.message);
  }
});

module.exports = {
  createAppointment,
  getAppointment,
  getAllAppointments,
  deleteAppointment,
};
