const mongoose = require('mongoose');

const hotelShema = new mongoose.Schema({

    fullName: { type: String, required: true },
    age: { type: Number, required: true },
    gender: { type: String, required: true },
    checkInDate: { type: Date, required: true },
    checkOutDate: { type: Date, required: true },
    guests: { type: Number, required: true }
});

module.exports = mongoose.model('HotelBook', hotelShema);