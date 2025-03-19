//import express
const express = require("express");

//import mongoose
const mongoose = require("mongoose");

//import bodyParser-json file format convert to java script obj
const bodyParser = require("body-parser");

//import cors
const cors = require("cors");

const app = express();

//import routes
const carRoute = require("./routes/carRoute");
const flightRoute = require("./routes/flightBooking");

//app middleware
app.use(bodyParser.json());
app.use(cors());

//route middleware
app.use(carRoute);
app.use(flightRoute);

//declaring server running port and creating DB connection
const PORT = 8000;
app.listen(PORT, () => {
  console.log(`App is running on ${PORT}`);
});

const DB_URL =
  "mongodb+srv://malithi01:travel01@airtravel.n87cr.mongodb.net/airTravel";

mongoose
  .connect(DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB connected");
  })
  .catch((err) => console.log("DB connection error", err));
