import React, { useState, useEffect } from "react";
import axios from "axios";
import "../stylesheets/createRent.css";

const CreateRents = () => {
  const [carOrderid, setCarOrderId] = useState("");
  const [destination, setDestination] = useState("");
  const [vehicleType, setVehicleType] = useState("");
  const [pickUpLocation, setPickUpLocation] = useState("");
  const [pickUpDate, setpickUpDate] = useState("");
  const [dropOffLocation, setDropOffLocation] = useState("");
  const [dropOffDate, setDropOffDate] = useState("");
  const [formErrors, setFormErrors] = useState({});

  // Fetch the latest order ID and generate the next one
  const fetchLatestOrderId = async () => {
    try {
      const response = await axios.get("http://localhost:8000/rent/latest");
      const latestOrderId = response.data.latestOrderId;

      if (latestOrderId) {
        // Extract the numeric part, increment and pad with zeros
        const numericPart = parseInt(latestOrderId.slice(1), 10) + 1;
        const newOrderId = `R${numericPart.toString().padStart(3, "0")}`;
        setCarOrderId(newOrderId);
      } else {
        // If none exists, start with R001
        setCarOrderId("R001");
      }
    } catch (error) {
      console.error("Error fetching latest order ID:", error);
      setCarOrderId("R001"); // fallback
    }
  };

  useEffect(() => {
    fetchLatestOrderId();
  }, []);

  // Validating form details
  const validateForm = () => {
    const errors = {};
    let formIsValid = true;

    if (!carOrderid.trim()) {
      errors.carOrderid = "Order ID is required";
      formIsValid = false;
    }

    if (!destination.trim()) {
      errors.destination = "Destination is required";
      formIsValid = false;
    }

    if (!vehicleType.trim()) {
      errors.vehicleType = "Vehicle type is required";
      formIsValid = false;
    }

    if (!pickUpLocation.trim()) {
      errors.pickUpLocation = "Pick Up Location is required";
      formIsValid = false;
    }

    if (!pickUpDate) {
      errors.pickUpDate = "Pick Up Date is required";
      formIsValid = false;
    } else {
      const currentDate = new Date();
      const selectedDate = new Date(pickUpDate);
      if (selectedDate < currentDate) {
        errors.pickUpDate = "Pick Up Date cannot be a past date";
        formIsValid = false;
      }
    }

    if (!dropOffDate) {
      errors.dropOffDate = "Drop Off Date is required";
      formIsValid = false;
    }

    if (pickUpDate && dropOffDate) {
      const pickUp = new Date(pickUpDate);
      const dropOff = new Date(dropOffDate);

      if (dropOff < pickUp) {
        errors.dropOffDate = "Drop Off Date cannot be before Pick Up Date";
        formIsValid = false;
      }
    }

    setFormErrors(errors);
    return formIsValid;
  };

  const sendData = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      const newRentData = {
        carOrderid,
        destination,
        vehicleType,
        pickUpLocation,
        pickUpDate,
        dropOffLocation,
        dropOffDate,
      };

      await axios.post("http://localhost:8000/rent/save", newRentData);

      alert("Details saved successfully");
    } catch (error) {
      console.error(
        "Error occurred while processing axios post request:",
        error
      );
      if (error.response && error.response.data && error.response.data.error) {
        alert(error.response.data.error);
      } else {
        alert("Failed to save record");
      }
    }

    // Reset form state
    setCarOrderId("");
    setDestination("");
    setVehicleType("");
    setPickUpLocation("");
    setpickUpDate("");
    setDropOffLocation("");
    setDropOffDate("");
  };

  const getOneDayLaterDate = () => {
    const today = new Date();
    today.setDate(today.getDate() + 1);
    return today.toISOString().split("T")[0];
  };

  return (
    <div className="container">
      <button className="btn-back">
        <a href="/rentDetails" className="back-link">
          Back
        </a>
      </button>
      <div className="form-container">
        <h1 className="form-title">Rent a Car</h1>
        <form onSubmit={sendData}>
          <div className="form-group">
            <label>Order ID</label>
            <input
              type="text"
              className="input"
              value={carOrderid}
              disabled
            />
            {formErrors.carOrderid && (
              <span className="error-text">{formErrors.carOrderid}</span>
            )}
          </div>

          <div className="form-group">
            <label>Destination</label>
            <input
              type="text"
              className={`input ${formErrors.destination && "input-error"}`}
              onChange={(e) => setDestination(e.target.value)}
              value={destination}
            />
            {formErrors.destination && (
              <span className="error-text">{formErrors.destination}</span>
            )}
          </div>

          <div className="form-group">
            <label>Vehicle Type</label>
            <select
              className={`input ${formErrors.vehicleType && "input-error"}`}
              onChange={(e) => setVehicleType(e.target.value)}
              value={vehicleType}
            >
              <option value="">Select a Vehicle type</option>
              <option value="Car">Car</option>
              <option value="Van">Van</option>
              <option value="Bike">Bike</option>
            </select>
            {formErrors.vehicleType && (
              <span className="error-text">{formErrors.vehicleType}</span>
            )}
          </div>

          <div className="form-group">
            <label>Pick Up Location</label>
            <input
              type="text"
              className={`input ${formErrors.pickUpLocation && "input-error"}`}
              onChange={(e) => setPickUpLocation(e.target.value)}
              value={pickUpLocation}
            />
            {formErrors.pickUpLocation && (
              <span className="error-text">{formErrors.pickUpLocation}</span>
            )}
          </div>

          <div className="form-group">
            <label>Pick Up Date</label>
            <input
              type="datetime-local"
              className={`input ${formErrors.pickUpDate && "input-error"}`}
              value={pickUpDate}
              min={getOneDayLaterDate()}
              onChange={(e) => setpickUpDate(e.target.value)}
            />
            {formErrors.pickUpDate && (
              <span className="error-text">{formErrors.pickUpDate}</span>
            )}
          </div>

          <div className="form-group">
            <label>Drop Off Location</label>
            <input
              type="text"
              className="input"
              onChange={(e) => setDropOffLocation(e.target.value)}
              value={dropOffLocation}
            />
          </div>

          <div className="form-group">
            <label>Drop Off Date</label>
            <input
              type="datetime-local"
              className={`input ${formErrors.dropOffDate && "input-error"}`}
              value={dropOffDate}
              min={new Date().toISOString().split("T")[0]}
              onChange={(e) => setDropOffDate(e.target.value)}
            />
            {formErrors.dropOffDate && (
              <span className="error-text">{formErrors.dropOffDate}</span>
            )}
          </div>

          <button type="submit" className="btn-submit">
            Save
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateRents;
