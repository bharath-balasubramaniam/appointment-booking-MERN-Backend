const express = require("express");
const { ifAdmin, ifAuth } = require("../middlewares/authMiddleware");
const {
  createAppointment,
  getAppointment,
  getAllAppointments,
  deleteAppointment,
} = require("../controllers/appointmentControllers");

const router = express.Router();

router.post("/", ifAuth, createAppointment);
router.get("/:id", ifAuth, getAppointment);
router.get("/", ifAdmin, getAllAppointments);
router.delete("/:id", ifAuth, deleteAppointment);

module.exports = router;
