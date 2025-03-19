const express = require("express");
const Booking = require("../models/createFlightBooking");

const router = express.Router();

//save bookings

router.post("/booking/save", async (req, res) => {
  try {
    let newBooking = new Booking(req.body);

    await newBooking.save();

    return res.status(200).json({ success: "Details saved successfully" });
  } catch (error) {
    return res.status(400).json({ error: err.message });
  }
});

module.exports = router;
