import React, { useState } from "react";
import axios from "axios";

const CreateBookings = () => {
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

  // Validating form details
  const validateForm = () => {
    const errors = {};
    let formIsValid = true;

    if (!bookingid.trim()) {
      errors.bookingid = "Booking ID is required";
      formIsValid = false;
    }

    if (!fullName.trim()) {
      errors.fullName = "Full name is required";
      formIsValid = false;
    }

    if (!age.trim()) {
      errors.age = "Age is required";
      formIsValid = false;
    }

    if (!contactNumber.trim()) {
      errors.contactNumber = "Contact number is required";
      formIsValid = false;
    }

    if (!emailAddress.trim()) {
      errors.emailAddress = "Email address is required";
      formIsValid = false;
    }

    if (!passportNumber.trim()) {
      errors.passportNumber = "Passport number is required";
      formIsValid = false;
    }

    if (!airlineName.trim()) {
      errors.airlineName = "Airline name is required";
      formIsValid = false;
    }

    if (!flightClass.trim()) {
      errors.flightClass = "Flight class is required";
      formIsValid = false;
    }

    if (!noOfPassengers.trim()) {
      errors.noOfPassengers = "No Of Passengers is required";
      formIsValid = false;
    }

    if (!seatType.trim()) {
      errors.seatType = "Seat Type is required";
      formIsValid = false;
    }

    if (!ticketPrice.trim()) {
      errors.ticketPrice = "Ticket Price is required";
      formIsValid = false;
    }

    if (!paymentMethod.trim()) {
      errors.paymentMethod = "payment Method is required";
      formIsValid = false;
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
      const newBooikngData = {
        bookingid,
        fullName,
        age,
        contactNumber,
        emailAddress,
        passportNumber,
        airlineName,
        flightClass,
        noOfPassengers,
        seatType,
        ticketPrice,
        paymentMethod,
      };

      await axios.post("http://localhost:8000/booking/save", newBooikngData);

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
    setBookingId("");
    setFullName("");
    setAge("");
    setContactNumber("");
    setEmailAddress("");
    setPassportNumber("");
    setAirlineName("");
    setFlightClass("");
    setNoOfPassengers("");
    setSeatType("");
    setTicketPrice("");
    setPaymentMethod("");
    setFormErrors("");
  };

  return (
    <div className="container">
      <button className="btn-back">
        <a href="/bookingDetails" className="back-link">
          Back
        </a>
      </button>
      <div className="form-container">
        <h1 className="form-title">Book a flight</h1>
        <form onSubmit={sendData}>
          <div className="form-group">
            <label>Booking ID</label>
            <input
              type="text"
              className={`input ${formErrors.bookingid && "input-error"}`}
              onChange={(e) => setBookingId(e.target.value)}
              value={bookingid}
            />
            {formErrors.bookingid && (
              <span className="error-text">{formErrors.bookingid}</span>
            )}
          </div>

          <div className="form-group">
            <label>Full Name</label>
            <input
              type="text"
              className={`input ${formErrors.fullName && "input-error"}`}
              onChange={(e) => setFullName(e.target.value)}
              value={fullName}
            />
            {formErrors.fullName && (
              <span className="error-text">{formErrors.fullName}</span>
            )}
          </div>

          <div className="form-group">
            <label>Age</label>
            <input
              type="text"
              className={`input ${formErrors.age && "input-error"}`}
              onChange={(e) => setAge(e.target.value)}
              value={age}
            />
            {formErrors.age && (
              <span className="error-text">{formErrors.age}</span>
            )}
          </div>

          <div className="form-group">
            <label>Contact Number</label>
            <input
              type="text"
              className={`input ${formErrors.contactNumber && "input-error"}`}
              onChange={(e) => setContactNumber(e.target.value)}
              value={contactNumber}
            />
            {formErrors.contactNumber && (
              <span className="error-text">{formErrors.contactNumber}</span>
            )}
          </div>

          <div className="form-group">
            <label>Email Address</label>
            <input
              type="text"
              className={`input ${formErrors.emailAddress && "input-error"}`}
              onChange={(e) => setEmailAddress(e.target.value)}
              value={emailAddress}
            />
            {formErrors.emailAddress && (
              <span className="error-text">{formErrors.emailAddress}</span>
            )}
          </div>

          <div className="form-group">
            <label>Passport Number</label>
            <input
              type="text"
              className={`input ${formErrors.passportNumber && "input-error"}`}
              onChange={(e) => setPassportNumber(e.target.value)}
              value={passportNumber}
            />
            {formErrors.passportNumber && (
              <span className="error-text">{formErrors.passportNumber}</span>
            )}
          </div>

          <div className="form-group">
            <label>Airline Name</label>
            <input
              type="text"
              className={`input ${formErrors.airlineName && "input-error"}`}
              onChange={(e) => setAirlineName(e.target.value)}
              value={airlineName}
            />
            {formErrors.airlineName && (
              <span className="error-text">{formErrors.airlineName}</span>
            )}
          </div>

          <div className="form-group">
            <label>Flight Class</label>
            <input
              type="text"
              className={`input ${formErrors.flightClass && "input-error"}`}
              onChange={(e) => setFlightClass(e.target.value)}
              value={flightClass}
            />
            {formErrors.flightClass && (
              <span className="error-text">{formErrors.flightClass}</span>
            )}
          </div>

          <div className="form-group">
            <label>Number Of Passengers</label>
            <input
              type="text"
              className={`input ${formErrors.noOfPassengers && "input-error"}`}
              onChange={(e) => setNoOfPassengers(e.target.value)}
              value={noOfPassengers}
            />
            {formErrors.noOfPassengers && (
              <span className="error-text">{formErrors.noOfPassengers}</span>
            )}
          </div>

          <div className="form-group">
            <label>Seat Type</label>
            <input
              type="text"
              className={`input ${formErrors.seatType && "input-error"}`}
              onChange={(e) => setSeatType(e.target.value)}
              value={seatType}
            />
            {formErrors.seatType && (
              <span className="error-text">{formErrors.seatType}</span>
            )}
          </div>

          <div className="form-group">
            <label>Ticket Price</label>
            <input
              type="text"
              className={`input ${formErrors.ticketPrice && "input-error"}`}
              onChange={(e) => setTicketPrice(e.target.value)}
              value={ticketPrice}
            />
            {formErrors.ticketPrice && (
              <span className="error-text">{formErrors.ticketPrice}</span>
            )}
          </div>

          <div className="form-group">
            <label>Payment Method</label>
            <input
              type="text"
              className={`input ${formErrors.paymentMethod && "input-error"}`}
              onChange={(e) => setPaymentMethod(e.target.value)}
              value={paymentMethod}
            />
            {formErrors.paymentMethod && (
              <span className="error-text">{formErrors.paymentMethod}</span>
            )}
          </div>

          <button type="submit" className="btn-submit">
            Save
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateBookings;
