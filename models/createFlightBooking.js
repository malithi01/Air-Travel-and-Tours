const mongoose = require("mongoose");

const flightSchema = new mongoose.Schema({
  // Passenger Details
  fullName: {
    type: String,
    required: true,
  },

  age: {
    type: Number,
    required: true,
  },

  gender: {
    type: String,
    required: true,
  },

  contactNumber: {
    type: String,
    required: true,
  },

  emailAddress: {
    type: String,
    required: true,
  },

  passportNumber: {
    type: String,
    required: true,
  },

  // Flight Details
  airlineName: {
    type: String,
    required: true,
  },

  flightClass: {
    type: String,
    required: true,
  },

  noOfPassengers: {
    type: Number,
    required: true,
  },

  // Seat Preferences
  seatType: {
    type: String,
    required: true,
  },

  //Payment
  ticketPrice: {
    type: String,
    required: true,
  },

  paymentMethod: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Bookings", flightSchema);
