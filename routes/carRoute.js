const express = require("express");
const CarRents = require("../models/carRentalModel");

const router = express.Router();

//save car rental details

router.post("/rent/save", async (req, res) => {
  try {
    let newRent = new CarRents(req.body);

    await newRent.save();

    return res.status(200).json({ success: "Details saved successfully" });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
});

// Get all rent details
router.get("/rent", async (req, res) => {
  try {
    const rent = await CarRents.find().exec();
    return res.status(200).json({ success: true, existingRents: rent });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
});

// Update rent details by ID
router.put("/rent/update/:id", async (req, res) => {
  try {
    await CarRents.findByIdAndUpdate(req.params.id, {
      $set: req.body,
    }).exec();
    return res.status(200).json({ success: "Updated Successfully" });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
});

// Delete Rent details by ID
router.delete("/rent/delete/:id", async (req, res) => {
  try {
    const deletedRents = await CarRents.findByIdAndDelete(
      req.params.id
    ).exec();
    return res.json({ message: "Booking Canceled Successfully", deletedRents });
  } catch (err) {
    return res
      .status(400)
      .json({ message: "Deleted unsuccessfully", error: err.message });
  }
});

router.get("/rent/latest", async (req, res) => {
  try {
    // Sort by created date or carOrderid, limit to the latest entry
    const latestRent = await CarRents.findOne().sort({ carOrderid: -1 }).exec();

    if (latestRent && latestRent.carOrderid) {
      return res.status(200).json({ latestOrderId: latestRent.carOrderid });
    } else {
      return res.status(200).json({ latestOrderId: null });
    }
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
});

//Get Specific Rent details by ID
router.get("/rent/:id", async (req, res) => {
  try {
    let rentID = req.params.id;
    let rentDetails = await CarRents.findById(rentID);
    if (!rentDetails) {
      return res
        .status(404)
        .json({ success: false, message: "Record not found" });
    }
    return res.status(200).json({ success: true, rentDetails });
  } catch (err) {
    return res.status(400).json({ success: false, error: err.message });
  }
});

module.exports = router;
