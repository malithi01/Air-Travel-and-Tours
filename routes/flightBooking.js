const express = require("express");
const Booking = require("../models/createFlightBooking");

const router = express.Router();

//save bookings

router.post("/booking/save", async (req, res) => {
  try {
    let newBooking = new Booking(req.body);

    await newBooking.save();

    return res.status(200).json({ success: "Details saved successfully" });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
});

// Get all booking details

router.get("/booking", async (req, res) => {
  try {
    const newBooking = await Booking.find().exec();
    return res
      .status(200)
      .json({ success: true, existingBookings: newBooking });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
});

// Update rent details by ID
router.put("/booking/update/:id", async (req, res) => {
  try {
    await Booking.findByIdAndUpdate(req.params.id, {
      $set: req.body,
    }).exec();
    return res.status(200).json({ success: "Updated Successfully" });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
});

// Delete booking details by ID
router.delete("/booking/delete/:id", async (req, res) => {
  try {
    const deletedBookings = await Booking.findByIdAndDelete(
      req.params.id
    ).exec();
    return res.json({ message: "Delete Successfully", deletedBookings });
  } catch (err) {
    return res
      .status(400)
      .json({ message: "Deleted unsuccessfully", error: err.message });
  }
});

module.exports = router;
