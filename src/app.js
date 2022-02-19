const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const dbConnect = require("./config/mongo");
const { errorHandler, notFound } = require("./middlewares/errorMiddleware");
const userRoute = require("./routes/userRoute");
const appointmentRoute = require("./routes/appointmentRoute");
const timeSlotRoute = require("./routes/timeSlotRoute");

dotenv.config();

const app = express();

//connect to DB
dbConnect();
//middlewares
app.use(cors());
app.use(express.json());
app.get("/", (req, res) => {
  res.send("API is running successsfully");
});
//routes
app.use("/users", userRoute);
app.use("/appointments", appointmentRoute);
app.use("/timeSlot", timeSlotRoute);
//Error
app.use(notFound);
app.use(errorHandler);
module.exports = app;
