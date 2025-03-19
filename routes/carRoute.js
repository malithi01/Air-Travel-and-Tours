const express = require("express");
const CarRents = require("../models/carRentalModel");

const router = express.Router();

//save car rental details

router.post("/rent/save", async (req, res) => {
  try {
    let newRent = new CarRents(req.body);

    await newRent.save();

    return res.status(200).json({ success: "Details saved successfully" });
  } catch (error) {
    return res.status(400).json({ error: err.message });
  }
});

// Get all rent details
router.get("/rent", async (req, res) => {
  try {
    const rent = await CarRents.find().exec();
    return res.status(200).json({ success: true, existingRecords: rent });
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

// Delete customer details by ID
router.delete("/rent/delete/:id", async (req, res) => {
  try {
    const deletedRents = await CarRents.findByIdAndDelete(
      req.params.id
    ).exec();
    return res.json({ message: "Delete Successfully", deletedRents });
  } catch (err) {
    return res
      .status(400)
      .json({ message: "Deleted unsuccessfully", error: err.message });
  }
});

module.exports = router;
