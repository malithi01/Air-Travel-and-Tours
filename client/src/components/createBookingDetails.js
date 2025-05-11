import React, { useState, useEffect } from "react";
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
  const [noOfPassengers, setNoOfPassengers] = useState("1");
  const [seatType, setSeatType] = useState("");
  const [ticketPrice, setTicketPrice] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [formErrors, setFormErrors] = useState({});
  
  // Define price mapping for each airline and class
  const airlinePricing = {
    "Emirates": {
      "Economy": 750,
      "Premium Economy": 1200,
      "Business": 2500,
      "First Class": 4000
    },
    "Qatar Airways": {
      "Economy": 800,
      "Premium Economy": 1300,
      "Business": 2600,
      "First Class": 4200
    },
    "Sri Lankan": {
      "Economy": 650,
      "Premium Economy": 1100,
      "Business": 2200,
      "First Class": 3500
    }
  };

  // Options for dropdown menus
  const airlineOptions = [
    "Emirates",
    "Qatar Airways",
    "Sri Lankan"
  ];

  const flightClassOptions = [
    "Economy",
    "Premium Economy",
    "Business",
    "First Class"
  ];

  const seatTypeOptions = [
    "Window",
    "Middle",
    "Aisle",
    "Bulkhead",
    "Exit Row"
  ];

  const paymentMethodOptions = [
    "Credit Card",
    "Debit Card",
    "PayPal",
    "Bank Transfer",
    "Apple Pay",
    "Google Pay"
  ];

  // Parse URL parameters on component mount
  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const airlineParam = queryParams.get("airline");
    
    if (airlineParam && airlineOptions.includes(airlineParam)) {
      setAirlineName(airlineParam);
      
      // If airline is pre-selected, set a default class to calculate initial price
      const defaultClass = "Economy";
      setFlightClass(defaultClass);
      
      // Calculate initial price based on selected airline and default class
      if (airlinePricing[airlineParam] && airlinePricing[airlineParam][defaultClass]) {
        setTicketPrice(airlinePricing[airlineParam][defaultClass]);
      }
    }
    
    fetchLatestBookingId();
  }, []);

  // Calculate ticket price whenever airline, flight class, or number of passengers changes
  useEffect(() => {
    calculateTicketPrice();
  }, [airlineName, flightClass, noOfPassengers]);

  // Calculate ticket price based on selected airline and class
  const calculateTicketPrice = () => {
    if (airlineName && flightClass && noOfPassengers) {
      if (airlinePricing[airlineName] && airlinePricing[airlineName][flightClass]) {
        const basePrice = airlinePricing[airlineName][flightClass];
        const totalPrice = basePrice * parseInt(noOfPassengers, 10);
        setTicketPrice(totalPrice.toString());
      }
    }
  };

  // Fetch the latest booking ID and generate the next one
  const fetchLatestBookingId = async () => {
    try {
      const response = await axios.get("http://localhost:8000/booking/latest");
      const latestBookingId = response.data.latestBookingId;

      if (latestBookingId) {
        // Extract the numeric part, increment and pad with zeros
        const numericPart = parseInt(latestBookingId.slice(1), 10) + 1;
        const newBookingId = `R${numericPart.toString().padStart(3, "0")}`;
        setBookingId(newBookingId);
      } else {
        // If none exists, start with R001
        setBookingId("R001");
      }
    } catch (error) {
      console.error("Error fetching latest booking ID:", error);
      setBookingId("R001"); // fallback
    }
  };

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

    if (!contactNumber.trim() || !/^\d{10}$/.test(contactNumber)) {
      errors.contactNumber = "Contact number must be 10 digits";
      formIsValid = false;
    }

    if (!emailAddress.trim()) {
      errors.emailAddress = "Email address is required";
      formIsValid = false;
    }

    if (
      !emailAddress.trim() ||
      !/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i.test(emailAddress)
    ) {
      errors.emailAddress = "Invalid email address";
      formIsValid = false;
    }

    if (!passportNumber.trim()) {
      errors.passportNumber = "Passport number is required";
      formIsValid = false;
    }

    if (!airlineName) {
      errors.airlineName = "Airline name is required";
      formIsValid = false;
    }

    if (!flightClass) {
      errors.flightClass = "Flight class is required";
      formIsValid = false;
    }

    if (!noOfPassengers.trim()) {
      errors.noOfPassengers = "Number of passengers is required";
      formIsValid = false;
    }

    if (!seatType) {
      errors.seatType = "Seat Type is required";
      formIsValid = false;
    }

    if (!ticketPrice) {
      errors.ticketPrice = "Ticket Price is required";
      formIsValid = false;
    }

    if (!paymentMethod) {
      errors.paymentMethod = "Payment Method is required";
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
      const newBookingData = {
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

      await axios.post("http://localhost:8000/booking/save", newBookingData);

      alert("Details saved successfully");
      
      // Reset form state
      setBookingId("");
      setFullName("");
      setAge("");
      setContactNumber("");
      setEmailAddress("");
      setPassportNumber("");
      setAirlineName("");
      setFlightClass("");
      setNoOfPassengers("1");
      setSeatType("");
      setTicketPrice("");
      setPaymentMethod("");
      setFormErrors({});
      
      // Generate new booking ID
      fetchLatestBookingId();
      
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
  };

  return (
    <div className="container">
      <button className="btn-back">
        <a href="/flightDashboard" className="back-link">
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
              value={bookingid}
              readOnly
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
              type="number"
              className={`input ${formErrors.age && "input-error"}`}
              onChange={(e) => setAge(e.target.value)}
              value={age}
              min="0"
            />
            {formErrors.age && (
              <span className="error-text">{formErrors.age}</span>
            )}
          </div>

          <div className="form-group">
            <label>Contact Number</label>
            <input
              type="tel"
              className={`input ${formErrors.contactNumber && "input-error"}`}
              onChange={(e) => setContactNumber(e.target.value)}
              value={contactNumber}
              maxLength="10"
            />
            {formErrors.contactNumber && (
              <span className="error-text">{formErrors.contactNumber}</span>
            )}
          </div>

          <div className="form-group">
            <label>Email Address</label>
            <input
              type="email"
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
            <select
              className={`input ${formErrors.airlineName && "input-error"}`}
              onChange={(e) => setAirlineName(e.target.value)}
              value={airlineName}
            >
              <option value="">Select Airline</option>
              {airlineOptions.map((airline, index) => (
                <option key={index} value={airline}>
                  {airline}
                </option>
              ))}
            </select>
            {formErrors.airlineName && (
              <span className="error-text">{formErrors.airlineName}</span>
            )}
          </div>

          <div className="form-group">
            <label>Flight Class</label>
            <select
              className={`input ${formErrors.flightClass && "input-error"}`}
              onChange={(e) => setFlightClass(e.target.value)}
              value={flightClass}
            >
              <option value="">Select Flight Class</option>
              {flightClassOptions.map((flightClass, index) => (
                <option key={index} value={flightClass}>
                  {flightClass}
                </option>
              ))}
            </select>
            {formErrors.flightClass && (
              <span className="error-text">{formErrors.flightClass}</span>
            )}
          </div>

          <div className="form-group">
            <label>Number Of Passengers</label>
            <input
              type="number"
              className={`input ${formErrors.noOfPassengers && "input-error"}`}
              onChange={(e) => setNoOfPassengers(e.target.value)}
              value={noOfPassengers}
              min="1"
            />
            {formErrors.noOfPassengers && (
              <span className="error-text">{formErrors.noOfPassengers}</span>
            )}
          </div>

          <div className="form-group">
            <label>Seat Type</label>
            <select
              className={`input ${formErrors.seatType && "input-error"}`}
              onChange={(e) => setSeatType(e.target.value)}
              value={seatType}
            >
              <option value="">Select Seat Type</option>
              {seatTypeOptions.map((seatType, index) => (
                <option key={index} value={seatType}>
                  {seatType}
                </option>
              ))}
            </select>
            {formErrors.seatType && (
              <span className="error-text">{formErrors.seatType}</span>
            )}
          </div>

          <div className="form-group">
            <label>Ticket Price ($)</label>
            <input
              type="text"
              className={`input ${formErrors.ticketPrice && "input-error"}`}
              value={ticketPrice}
              readOnly
            />
            {formErrors.ticketPrice && (
              <span className="error-text">{formErrors.ticketPrice}</span>
            )}
          </div>

          <div className="form-group">
            <label>Payment Method</label>
            <select
              className={`input ${formErrors.paymentMethod && "input-error"}`}
              onChange={(e) => setPaymentMethod(e.target.value)}
              value={paymentMethod}
            >
              <option value="">Select Payment Method</option>
              {paymentMethodOptions.map((paymentMethod, index) => (
                <option key={index} value={paymentMethod}>
                  {paymentMethod}
                </option>
              ))}
            </select>
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
};

export default CreateBookings;