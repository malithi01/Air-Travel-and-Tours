import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const EditHotel = () => {
  const [fullName, setFullName] = useState("");
  const [roomType, setRoomType] = useState("");
  const [guests, setGuests] = useState("");
  const [checkInDate, setCheckInDate] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");
  const [formErrors, setFormErrors] = useState({});

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:8000/hotel/${id}`)
      .then((res) => {
        const data = res.data.hotelDetails;
        setFullName(data.fullName);
        setRoomType(data.roomType);
        setGuests(data.guests);
        setCheckInDate(
          data.checkInDate ? new Date(data.checkInDate).toISOString().slice(0, 16) : ""
        );
        setCheckOutDate(
          data.checkOutDate ? new Date(data.checkOutDate).toISOString().slice(0, 16) : ""
        );
      })
      .catch(() => console.log("Error fetching hotel data"));
  }, [id]);

  const validateForm = () => {
    const errors = {};
    let formIsValid = true;

    if (!fullName.trim()) {
      errors.fullName = "Hotel name is required";
      formIsValid = false;
    }

    if (!roomType.trim()) {
      errors.roomType = "Room type is required";
      formIsValid = false;
    }

    if (!guests.trim()) {
      errors.guests = "Number of guests is required";
      formIsValid = false;
    }

    if (!checkInDate) {
      errors.checkInDate = "Check-in date is required";
      formIsValid = false;
    }

    if (!checkOutDate) {
      errors.checkOutDate = "Check-out date is required";
      formIsValid = false;
    }

    if (checkInDate && checkOutDate) {
      const checkIn = new Date(checkInDate);
      const checkOut = new Date(checkOutDate);
      if (checkOut <= checkIn) {
        errors.checkOutDate = "Check-out date must be after check-in date";
        formIsValid = false;
      }
    }

    setFormErrors(errors);
    return formIsValid;
  };

  const updateData = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const confirmed = window.confirm("Are you sure you want to update this hotel booking?");
    if (!confirmed) return;

    const updatedHotelData = {
      fullName,
      roomType,
      guests,
      checkInDate: new Date(checkInDate).toISOString(),
      checkOutDate: new Date(checkOutDate).toISOString(),
    };

    axios
      .put(`http://localhost:8000/hotel/update/${id}`, updatedHotelData)
      .then(() => {
        alert("Updated Successfully!");
        navigate("/hotelDetails");
      })
      .catch(() => console.log("Update failed!"));
  };

  return (
    <div className="edit-container">
      <div className="edit-card">
        <h2 className="edit-title">Update Hotel Booking</h2>
        <form onSubmit={updateData}>
          <div className="edit-form-group">
            <label>Hotel Name</label>
            <input type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} />
            {formErrors.fullName && <p className="edit-error-message">{formErrors.fullName}</p>}
          </div>

          <div className="edit-form-group">
            <label>Room Type</label>
            <select value={roomType} onChange={(e) => setRoomType(e.target.value)}>
              <option value="">Select a Room Type</option>
              <option value="Single">Single</option>
              <option value="Double">Double</option>
              <option value="Suite">Suite</option>
            </select>
            {formErrors.roomType && <p className="edit-error-message">{formErrors.roomType}</p>}
          </div>

          <div className="edit-form-group">
            <label>Number of Guests</label>
            <input type="number" value={guests} onChange={(e) => setGuests(e.target.value)} />
            {formErrors.guests && <p className="edit-error-message">{formErrors.guests}</p>}
          </div>

          <div className="edit-form-group">
            <label>Check-in Date</label>
            <input type="datetime-local" value={checkInDate} onChange={(e) => setCheckInDate(e.target.value)} />
            {formErrors.checkInDate && <p className="edit-error-message">{formErrors.checkInDate}</p>}
          </div>

          <div className="edit-form-group">
            <label>Check-out Date</label>
            <input type="datetime-local" value={checkOutDate} onChange={(e) => setCheckOutDate(e.target.value)} />
            {formErrors.checkOutDate && <p className="edit-error-message">{formErrors.checkOutDate}</p>}
          </div>

          <button type="submit" className="update-btn">Update</button>
        </form>
      </div>
    </div>
  );
};

export default EditHotel;
