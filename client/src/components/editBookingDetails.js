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

  const airlineOptions = [
    "Emirates", "Qatar Airways", "Singapore Airlines", "Air France",
    "Lufthansa", "British Airways", "American Airlines", "Delta Air Lines",
    "United Airlines", "Other",
  ];

  const flightClassOptions = ["Economy", "Premium Economy", "Business", "First Class"];
  const seatTypeOptions = ["Window", "Middle", "Aisle", "Bulkhead", "Exit Row"];
  const paymentMethodOptions = ["Credit Card", "Debit Card", "PayPal", "Bank Transfer", "Cash"];

  useEffect(() => {
    axios.get(`http://localhost:8000/booking/${id}`)
      .then((res) => {
        const data = res.data.bookingDetails;
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

    if (!fullName.trim()) {
      errors.fullName = "Full name is required";
      formIsValid = false;
    }

    if (!contactNumber.trim()) {
      errors.contactNumber = "Contact Number is required";
      formIsValid = false;
    } else if (!/^\d{10}$/.test(contactNumber)) {
      errors.contactNumber = "Contact Number must be exactly 10 digits";
      formIsValid = false;
    }

    if (!emailAddress.trim()) {
      errors.emailAddress = "Email Address is required";
      formIsValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailAddress)) {
      errors.emailAddress = "Invalid Email Address format";
      formIsValid = false;
    }

    if (!passportNumber.trim()) {
      errors.passportNumber = "Passport Number is required";
      formIsValid = false;
    }

    if (!airlineName.trim()) {
      errors.airlineName = "Airline Name is required";
      formIsValid = false;
    }

    if (!flightClass.trim()) {
      errors.flightClass = "Flight Class is required";
      formIsValid = false;
    }

    if (!seatType.trim()) {
      errors.seatType = "Seat Type is required";
      formIsValid = false;
    }

    if (!paymentMethod.trim()) {
      errors.paymentMethod = "Payment Method is required";
      formIsValid = false;
    }

    setFormErrors(errors);
    return formIsValid;
  };

  const updateData = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const confirmed = window.confirm("Are you sure you want to update this booking?");
    if (!confirmed) return;

    const updatedBookingData = {
      bookingid, fullName, age, contactNumber, emailAddress,
      passportNumber, airlineName, flightClass, noOfPassengers,
      seatType, ticketPrice, paymentMethod,
    };

    axios.put(`http://localhost:8000/booking/update/${id}`, updatedBookingData)
      .then(() => {
        alert("Updated Successfully!");
        navigate("/bookingDetails");
      })
      .catch(() => console.log("Update failed!"));
  };

  return (
    <div className="editcontainer">
      <div className="editcard">
        <h2 className="edittitle">Update Booking Details</h2>
        <form onSubmit={updateData}>
          <div className="editform-group">
            <label>Full Name</label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className={formErrors.fullName ? "error" : ""}
            />
            {formErrors.fullName && <p className="editerror-message">{formErrors.fullName}</p>}
          </div>

          <div className="editform-group">
            <label>Age</label>
            <input
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value)}
            />
          </div>

          <div className="editform-group">
            <label>Contact Number</label>
            <input
              type="tel"
              value={contactNumber}
              onChange={(e) => {
                const value = e.target.value;
                if (/^\d{0,10}$/.test(value)) setContactNumber(value);
              }}
              maxLength="10"
              pattern="\d{10}"
              placeholder="10-digit number"
              className={formErrors.contactNumber ? "error" : ""}
            />
            {formErrors.contactNumber && <p className="editerror-message">{formErrors.contactNumber}</p>}
          </div>

          <div className="editform-group">
            <label>Email Address</label>
            <input
              type="email"
              value={emailAddress}
              onChange={(e) => setEmailAddress(e.target.value)}
              className={formErrors.emailAddress ? "error" : ""}
            />
            {formErrors.emailAddress && <p className="editerror-message">{formErrors.emailAddress}</p>}
          </div>

          <div className="editform-group">
            <label>Passport Number</label>
            <input
              type="text"
              value={passportNumber}
              onChange={(e) => setPassportNumber(e.target.value)}
              className={formErrors.passportNumber ? "error" : ""}
            />
            {formErrors.passportNumber && <p className="editerror-message">{formErrors.passportNumber}</p>}
          </div>

          <div className="editform-group">
            <label>Airline Name</label>
            <select
              value={airlineName}
              onChange={(e) => setAirlineName(e.target.value)}
              className={formErrors.airlineName ? "error" : ""}
            >
              <option value="">Select Airline</option>
              {airlineOptions.map((option) => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
            {formErrors.airlineName && <p className="editerror-message">{formErrors.airlineName}</p>}
          </div>

          <div className="editform-group">
            <label>Flight Class</label>
            <select
              value={flightClass}
              onChange={(e) => setFlightClass(e.target.value)}
              className={formErrors.flightClass ? "error" : ""}
            >
              <option value="">Select Flight Class</option>
              {flightClassOptions.map((option) => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
            {formErrors.flightClass && <p className="editerror-message">{formErrors.flightClass}</p>}
          </div>

          <div className="editform-group">
            <label>No Of Passengers</label>
            <input
              type="number"
              value={noOfPassengers}
              onChange={(e) => setNoOfPassengers(e.target.value)}
            />
          </div>

          <div className="editform-group">
            <label>Seat Type</label>
            <select
              value={seatType}
              onChange={(e) => setSeatType(e.target.value)}
              className={formErrors.seatType ? "error" : ""}
            >
              <option value="">Select Seat Type</option>
              {seatTypeOptions.map((option) => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
            {formErrors.seatType && <p className="editerror-message">{formErrors.seatType}</p>}
          </div>

          <div className="editform-group">
            <label>Ticket Price</label>
            <input
              type="text"
              value={ticketPrice}
              readOnly
              disabled
              className="disabled-input"
            />
          </div>

          <div className="editform-group">
            <label>Payment Method</label>
            <select
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className={formErrors.paymentMethod ? "error" : ""}
            >
              <option value="">Select Payment Method</option>
              {paymentMethodOptions.map((option) => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
            {formErrors.paymentMethod && <p className="editerror-message">{formErrors.paymentMethod}</p>}
          </div>

          <button type="submit" className="update-btn">Update</button>
        </form>
      </div>
    </div>
  );
};

export default EditBookings;
