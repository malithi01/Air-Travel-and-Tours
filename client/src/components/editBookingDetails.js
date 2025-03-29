import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const EditBookings = () => {
  const [bookingid, setBookingId] = useState("");
    const [fullName, setFullName] = useState("");
    const [age, setAge] = useState("");
    const [contactNumber, setContactNumber] = useState("");
    const [emailAddress, setEmailAddress] = useState("");
    const [passportNumber, setPassportNumber] = useState("");
    const [airlineName, setAirlineName] = useState("");
    const [flightClass, setFlightClass] = useState("");
    const [noOfPassengers, setNoOfPassengers] = useState("");
    const [seatType, setSeatType] = useState("");
    const [ticketPrice, setTicketPrice] = useState("");
    const [paymentMethod, setPaymentMethod] = useState("");
    const [formErrors, setFormErrors] = useState({});

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:8000/booking/${id}`)
      .then((res) => {
        const data = res.data.rentDetails;
        setBookingId(data.bookingid);
        setFullName(data.fullName);
        setAge(data.age);
        setContactNumber(data.contactNumber);
        setEmailAddress(data.emailAddress);
        setPassportNumber(data.passportNumber);
        setAirlineName(data.airlineName);
        setFlightClass(data.flightClass);
        setNoOfPassengers(data.noOfPassengers);
        setSeatType(data.seatType);
        setTicketPrice(data.ticketPrice);
        setPaymentMethod(data.paymentMethod);
        
      })
      .catch((err) => console.log("Error fetching data"));
  }, [id]);

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

  const updateData = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const confirmed = window.confirm(
      "Are you sure you want to update this Order?"
    );
    if (!confirmed) return;

    const updatedRentData = {
      carOrderid,
      destination,
      vehicleType,
      pickUpLocation,
      pickUpDate: new Date(pickUpDate).toISOString(),
      dropOffLocation,
      dropOffDate: new Date(dropOffDate).toISOString(),
    };

    axios
      .put(`http://localhost:8000/rent/update/${id}`, updatedRentData)
      .then(() => {
        alert("Updated Successfully!");
        navigate("/rentDetails");
      })
      .catch(() => console.log("Update failed!"));
  };

  const getOneDayLaterDate = () => {
    const today = new Date();
    today.setDate(today.getDate() + 2);
    return today.toISOString().slice(0, 16);
  };

  return (
    <div className="editcontainer">
      <div className="editcard">
        <h2 className="edittitle">Update Rent Details</h2>
        <form onSubmit={updateData}>
          <div className="editform-group">
            <label>Order ID</label>
            <input
              type="text"
              value={carOrderid}
              onChange={(e) => setCarOrderId(e.target.value)}
              className={formErrors.carOrderid ? "error" : ""}
            />
            {formErrors.carOrderid && (
              <p className="editerror-message">{formErrors.carOrderid}</p>
            )}
          </div>

          <div className="editform-group">
            <label>Destination</label>
            <input
              type="text"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              className={formErrors.destination ? "error" : ""}
            />
            {formErrors.destination && (
              <p className="editerror-message">{formErrors.destination}</p>
            )}
          </div>

          <div className="editform-group">
            <label>Vehicle Type</label>
            <select
              value={vehicleType}
              onChange={(e) => setVehicleType(e.target.value)}
            >
              <option value="">Select a Vehicle</option>
              <option value="Car">Car</option>
              <option value="Van">Van</option>
              <option value="Bike">Bike</option>
            </select>
          </div>

          <div className="editform-group">
            <label>Pick Up Location</label>
            <input
              type="text"
              value={pickUpLocation}
              onChange={(e) => setPickUpLocation(e.target.value)}
            />
            {formErrors.pickUpLocation && (
              <span className="error-text">{formErrors.pickUpLocation}</span>
            )}
          </div>

          <div className="editform-group">
            <label>Pick Up Date</label>
            <input
              type="datetime-local"
              value={pickUpDate}
              min={getOneDayLaterDate()}
              onChange={(e) => setPickUpDate(e.target.value)}
            />
            {formErrors.pickUpDate && (
              <span className="error-text">{formErrors.pickUpDate}</span>
            )}
          </div>

          <div className="editform-group">
            <label>Drop Off Location</label>
            <input
              type="text"
              value={dropOffLocation}
              onChange={(e) => setDropOffLocation(e.target.value)}
            />
          </div>

          <div className="editform-group">
            <label>Drop Off Date</label>
            <input
              type="datetime-local"
              value={dropOffDate}
              min={
                pickUpDate
                  ? new Date(new Date(pickUpDate).getTime() + 2)
                      .toISOString()
                      .slice(0, 16)
                  : new Date().toISOString().slice(0, 16)
              }
              onChange={(e) => setDropOffDate(e.target.value)}
            />
          </div>

          <button type="submit" className="update-btn">
            Update
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditBookings;
