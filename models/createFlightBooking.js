const mongoose = require("mongoose");

const flightSchema = new mongoose.Schema({
  // Booking ID
  bookingid: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  
  // Passenger Details
  fullName: {
    type: String,
    required: true,
    trim: true
  },

  age: {
    type: Number,
    required: true,
    min: 0
  },

  contactNumber: {
    type: String,
    required: true,
    trim: true,
    match: /^\d{10}$/  // Ensure 10 digits
  },

  emailAddress: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    match: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/  // Basic email validation
  },

  passportNumber: {
    type: String,
    required: true,
    trim: true
  },

  // Flight Details
  airlineName: {
    type: String,
    required: true,
    enum: ["Emirates", "Qatar Airways", "Sri Lankan"] // Restrict to available airlines
  },

  flightClass: {
    type: String,
    required: true,
    enum: ["Economy", "Premium Economy", "Business", "First Class"] // Restrict to available classes
  },

  noOfPassengers: {
    type: Number,
    required: true,
    min: 1
  },

  // Seat Preferences
  seatType: {
    type: String,
    required: true,
    enum: ["Window", "Middle", "Aisle", "Bulkhead", "Exit Row"] // Restrict to available seat types
  },

  // Payment
  ticketPrice: {
    type: Number,
    required: true,
    min: 0
  },

  paymentMethod: {
    type: String,
    required: true,
    enum: ["Credit Card", "Debit Card", "PayPal", "Bank Transfer", "Apple Pay", "Google Pay"] // Restrict to available payment methods
  },
  
  // Add timestamp fields for when the booking was created and last updated
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Create an index on the bookingid field for faster queries
flightSchema.index({ bookingid: 1 });

module.exports = mongoose.model("Bookings", flightSchema);