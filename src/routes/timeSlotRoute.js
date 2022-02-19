const express = require("express");
const { ifAdmin, ifAuth } = require("../middlewares/authMiddleware");
const {
  createTimeSlots,
  getTimeSlot,
  allTimeSlots,
  deleteTimeSlot,
} = require("../controllers/timeSlotControllers");

const router = express.Router();

router.post("/", ifAdmin, createTimeSlots);
router.get("/:id", ifAuth, getTimeSlot);
router.get("/", ifAuth, allTimeSlots);
router.delete("/:id", ifAdmin, deleteTimeSlot);
module.exports = router;
