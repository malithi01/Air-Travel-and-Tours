const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({

    carOrderid:{
        type: String,
        required:true
    },
    destination:{
        type: String,
        required:true
    },
    vehicleType:{
        type: String,
        required:true
    },
    pickUpLocation:{
        type: String,
        required:true
    },
    pickUpDate:{
        type: Date,
        required: true
    },
    dropOffLocation:{
        type: String,
        required:true
    },
    dropOffDate:{
        type: Date,
        required: true
    }

});

module.exports = mongoose.model('CarRent', carSchema);