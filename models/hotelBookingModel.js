const mongoose = require('mongoose');

const hotelSchema = new mongoose.Schema({

    fullName: { type: String, required: true },
    email: {type:String, required:true},
    phoneNumber: { type: Number, required: true },
    address: { type: String, required: true },
    hotel: { type: String, required: true },
    roomType: { type: String, required: true },
    guests: { type: Number, required: true },
    checkInDate: { type: Date, required: true },
    checkOutDate: { type: Date, required: true }
});

module.exports = mongoose.model('HotelBook', hotelSchema);