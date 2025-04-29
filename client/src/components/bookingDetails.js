import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../stylesheets/bookingDetails.css";

const ViewBookingDetails = () => {
  const [BookingDetails, setBookings] = useState([]);
  const navigate = useNavigate();

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

  //implementing handleDelete function
  const handleDelete = async (id) => {
    try {
      const confirmed = window.confirm(
        "Are you sure you want to cancel this booking?"
      );
      if (confirmed) {
        await axios
          .delete(`http://localhost:8000/booking/delete/${id}`)
          .then((res) => {
            alert(res.data.message);
            console.log(res.data.message);
            setBookings(BookingDetails.filter((booking) => booking._id !== id));
          })
          .catch((err) => {
            if (err.response) {
              console.log(err.response.data.message);
            } else {
              console.log("Error occured while processing your axios delete");
            }
          });
      } else {
        alert("Deletion cancelled!");
      }
    } catch (err) {
      console.log("handleDelete function failed! ERROR: " + err.message);
    }
  };

  return (
    <div className="d-flex flex-column align-items-center">
      <button className="btn-back">
        <a href="/flightDashboard" className="back-link">
          Back
        </a>
      </button>
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

          <div className="button-container">
            <button
              className="update-button"
              onClick={() => navigate(`/editBookingDetails/${booking._id}`)}
            >
              📝 Update Booking
            </button>

            <button
              className="delete-button"
              onClick={() => handleDelete(booking._id)}
            >
              🗑️ Cancel Booking
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ViewBookingDetails;
