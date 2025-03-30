const express = require('express');
const HotelBook = require('../models/hotelBookingModel');

const router = express.Router();

//save all hotel booking details 

router.post('/hotels/save', async (req, res) => {
    try {
        let newBook = new HotelBook(req.body);

        await newBook.save();

        return res.status(200).json({ message: "Details saved successfully" });
    } catch (err) {
        return res.status(400).json({ error: error.message });
    }
});

//get all rent details

router.get('/hotels', async (req, res) => { 
    try {
        const hotels = await HotelBook.find().exec();
        return res.status(200).json({ success: true, existingHotel: hotels });
    } catch (err) {
        return res.status(400).json({ error: err.message });
    }
});


//update booking details
router.put("/hotels/update/:id", async (req,res) =>{
    try{
        await HotelBook.findByIdAndUpdate(req.params.id,{
            $set:req.body,
        }).exec();
        return res.status(200).json({success:"Updated Successfully"});
    }catch(err){
        return res.status(400).json({error:err.message});
    }
});

//delete
router.delete("/hotels/delete/:id", async (req, res) => {
    try {
      const deletedHotelBooking = await HotelBook.findByIdAndDelete(
        req.params.id
      ).exec();
      return res.json({ message: "Delete Successfully", deletedHotelBooking });
    } catch (err) {
      return res
        .status(400).json({ message: "Deleted unsuccessfully", error: err.message });
    }
  });

  router.get("/hotels/:id", async (req, res) => {
    try {
      let hotelID = req.params.id;
      let hotelDetails = await HotelBook.findById(hotelID);
      if (!hotelDetails) {
        return res
          .status(404)
          .json({ success: false, message: "Record not found" });
      }
      return res.status(200).json({ success: true, hotelDetails });
    } catch (err) {
      return res.status(400).json({ success: false, error: err.message });
    }
  });
  

module.exports = router;