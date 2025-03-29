import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../stylesheets/viewRent.css";

const ViewRentDetails = () => {
  const [RentDetails, setRents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getRentDetails = async () => {
      try {
        const res = await axios.get("http://localhost:8000/rent");
        setRents(res.data.existingRents);
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

    getRentDetails();
  }, []);

  // Function to calculate price
  const calculateTotalPrice = (vehicleType, pickUpDate, dropOffDate) => {
    const dailyRates = {
      car: 50,
      van: 100,
      bike: 20,
    };

    const startDate = new Date(pickUpDate);
    const endDate = new Date(dropOffDate);
    const diffTime = Math.abs(endDate - startDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) || 1; // Minimum 1 day
    const dailyRate = dailyRates[vehicleType.toLowerCase()] || 0;

    return dailyRate * diffDays;
  };

  //implementing handleDelete function
  const handleDelete = async (id) => {
    try {
      const confirmed = window.confirm(
        "Are you sure you want to cancel this booking?"
      );
      if (confirmed) {
        await axios
          .delete(`http://localhost:8000/rent/delete/${id}`)
          .then((res) => {
            alert(res.data.message);
            console.log(res.data.message);
            setRents(RentDetails.filter((rent) => rent._id !== id));
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
    <div className="rent-container">
      {RentDetails.map((rent, index) => (
        <div key={index} className="rent-card">
          <dl className="rent-details">
            <dd>
              <h4>{rent.carOrderid}</h4>
            </dd>
            <dd>
              <strong>Destination:</strong> {rent.destination || "Loading..."}
            </dd>
            <dd>
              <strong>Vehicle Type:</strong> {rent.vehicleType || "Loading..."}
            </dd>
            <dd>
              <strong>Pick Up Location:</strong>{" "}
              {rent.pickUpLocation || "Loading..."}
            </dd>
            <dd>
              <strong>Pick Up Date:</strong> {rent.pickUpDate || "Loading..."}
            </dd>
            <dd>
              <strong>Drop Off Location:</strong>{" "}
              {rent.dropOffLocation || "Loading..."}
            </dd>
            <dd>
              <strong>Drop Off Date:</strong> {rent.dropOffDate || "Loading..."}
            </dd>
            <dd>
              <strong>Total Price:</strong>{" "}
              {calculateTotalPrice(
                rent.vehicleType,
                rent.pickUpDate,
                rent.dropOffDate
              )}{" "}
              Rs
            </dd>
          </dl>
          <div className="button-container">
            <button
              className="update-button"
              onClick={() => navigate(`/editRents/${rent._id}`)}
            >
              📝 Update Order
            </button>

            <button
              className="delete-button"
              onClick={() => handleDelete(rent._id)}
            >
              🗑️ Cancel Booking
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ViewRentDetails;
