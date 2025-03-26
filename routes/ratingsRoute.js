const express = require('express');
const Ratings = require('../models/reviewsModel');

const router = express.Router();

//save car rental details

router.post("/reviews_and_ratings/save", async (req, res) => {
    try {
      let newReview = new Ratings(req.body);
  
      await newReview.save();
  
      return res.status(200).json({ success: "Details saved successfully" });
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  });
  
module.exports = router;
module.exports = router;

// Get all rent details
router.get("/reviews_and_ratings", async (req, res) => {
    try {
      const review = await Ratings.find().exec();
      return res.status(200).json({ success: true, existingReviews: review });
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  });
  
  // Update rent details by ID
router.put("/reviews_and_rating/update/:id", async (req, res) => {
    try {
      await Ratings.findByIdAndUpdate(req.params.id, {
        $set: req.body,
      }).exec();
      return res.status(200).json({ success: "Updated Successfully" });
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  });

  // Delete customer details by ID
router.delete("/reviews_and_rating/delete/:id", async (req, res) => {
    try {
      const deletedRatings = await Ratings.findByIdAndDelete(
        req.params.id
      ).exec();
      return res.json({ message: "Delete Successfully", deletedRatings });
    } catch (err) {
      return res
        .status(400)
        .json({ message: "Deleted unsuccessfully", error: err.message });
    }
  });
  
  
  
  module.exports = router;