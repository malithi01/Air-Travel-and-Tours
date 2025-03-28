import React, { useState, useEffect } from "react";
import axios from "axios";

const ViewBookingDetails = () => {
  const [BookingDetails, setBookings] = useState([]);

  useEffect(() => {
    const getBookingDetails = async () => {
      try {
        const res = await axios.get("http://localhost:8000/booking");
        setBookings(res.data.existingBookings);
        console.log("Status: " + res.data.success);
        console.log(res.data.message);
      } catch (err) {
        if (err.response) {
          console.log(err.response.data.error);
        } else {
          console.log("Error occurred while processing your get request");
        }
      }
    };

    getBookingDetails();
  }, []);

  return (
    <div className="d-flex flex-column align-items-center">
      {BookingDetails.map((booking, index) => (
        <div
          key={index}
          className="card text-center"
          style={{ width: "40rem", marginTop: "20px" }}
        >
          <dl className="row" style={{ padding: "20px" }}>
            <dd>
              <h4 style={{ textAlign: "center" }}>{booking.bookingid}</h4>
            </dd>
            <dd>
              <strong>Full Name:</strong> {booking.fullName || "Loading..."}
            </dd>
            <dd>
              <strong>Age:</strong> {booking.age || "Loading..."}
            </dd>
            <dd>
              <strong>Contact Number:</strong>{" "}
              {booking.contactNumber || "Loading..."}
            </dd>
            <dd>
              <strong>Email Address:</strong>{" "}
              {booking.emailAddress || "Loading..."}
            </dd>
            <dd>
              <strong>Passport Number:</strong>{" "}
              {booking.passportNumber || "Loading..."}
            </dd>
            <dd>
              <strong>Airline Name:</strong>{" "}
              {booking.airlineName || "Loading..."}
            </dd>
            <dd>
              <strong>Flight Class:</strong>{" "}
              {booking.flightClass || "Loading..."}
            </dd>
            <dd>
              <strong>No Of Passengers:</strong>{" "}
              {booking.noOfPassengers || "Loading..."}
            </dd>
            <dd>
              <strong>Seat Type:</strong> {booking.seatType || "Loading..."}
            </dd>
            <dd>
              <strong>Ticket Price:</strong>{" "}
              {booking.ticketPrice || "Loading..."}
            </dd>
            <dd>
              <strong>Payment Method:</strong>{" "}
              {booking.paymentMethod || "Loading..."}
            </dd>
          </dl>
        </div>
      ))}
    </div>
  );
};

export default ViewBookingDetails;
