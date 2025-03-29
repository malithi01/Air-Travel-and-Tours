import React, { useState } from "react";
import axios from "axios";

const CreateHotelDetails = () => {
    const [hotelBookingID, setHotelBookingID] = useState("");
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [address, setAddress] = useState("");
    const [hotel, setHotel] = useState("");
    const [roomType, setRoomType] = useState("");
    const [guests, setGuests] = useState("");
    const [checkInDate, setCheckInDate] = useState("");
    const [checkOutDate, setCheckOutDate] = useState("");
    const [formErrors, setFormErrors] = useState({});

    const validateForm = () => {
        const errors = {};
        let formIsValid = true;

        if (!hotelBookingID.trim()) {
            errors.hotelBookingID = "Booking ID is required";
            formIsValid = false;
        }

        if (!fullName.trim() || !/^[a-zA-Z\s]+$/.test(fullName)) {
            errors.fullName = "Full name should contain letters only";
            formIsValid = false;
        }

        if (!email.trim() || !/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i.test(email)) {
            errors.email = "Invalid email address";
            formIsValid = false;
        }

        if (!phoneNumber.trim() || !/^\d{10}$/.test(phoneNumber)) {
            errors.phoneNumber = "Phone number must be 10 digits";
            formIsValid = false;
        }

        if (!address.trim()) {
            errors.address = "Address is required";
            formIsValid = false;
        }

        if (!hotel.trim()) {
            errors.hotel = "Hotel is required";
            formIsValid = false;
        }

        if (!roomType.trim()) {
            errors.roomType = "Room type is required";
            formIsValid = false;
        }

        if (!guests.trim() || isNaN(guests) || parseInt(guests) <= 0) {
            errors.guests = "Number of guests must be a valid positive number";
            formIsValid = false;
        }

        if (!checkInDate.trim()) {
            errors.checkInDate = "Check-in Date is required";
            formIsValid = false;
        } else {
            const currentDate = new Date().setHours(0, 0, 0, 0);
            const selectedDate = new Date(checkInDate).setHours(0, 0, 0, 0);
            if (selectedDate < currentDate) {
                errors.checkInDate = "Check-in Date cannot be a past date";
                formIsValid = false;
            }
        }

        if (!checkOutDate.trim()) {
            errors.checkOutDate = "Check-out Date is required";
            formIsValid = false;
        }

        if (checkInDate && checkOutDate) {
            const checkIn = new Date(checkInDate);
            const checkOut = new Date(checkOutDate);
            if (checkOut <= checkIn) {
                errors.checkOutDate = "Check-out Date must be after Check-in Date";
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
            const newHotelData = {
                hotelBookingID,
                fullName,
                email,
                phoneNumber,
                address,
                hotel,
                roomType,
                guests,
                checkInDate,
                checkOutDate
            };

            await axios.post("http://localhost:8000/hotels/save", newHotelData);
            alert("Details saved successfully");

            // Reset form after successful submission
            setHotelBookingID("");
            setFullName("");
            setEmail("");
            setPhoneNumber("");
            setAddress("");
            setHotel("");
            setRoomType("");
            setGuests("");
            setCheckInDate("");
            setCheckOutDate("");
        } catch (error) {
            console.error("Error occurred while sending data:", error);
            alert("Failed to save record");
        }
    };

    return (
        <div className="container">
            <button className="btn-back">
                <a href="/rentDetails" className="back-link">Back</a>
            </button>
            <div className="form-container">
                <h1 className="form-title">Hotel Booking</h1>
                <form onSubmit={sendData}>
                    <div className="form-group">
                        <label>Hotel Booking ID</label>
                        <input type="text" className="input" value={hotelBookingID} onChange={(e) => setHotelBookingID(e.target.value)} />
                        {formErrors.hotelBookingID && <span className="error-text">{formErrors.hotelBookingID}</span>}
                    </div>

                    <div className="form-group">
                        <label>Full Name</label>
                        <input type="text" className="input" value={fullName} onChange={(e) => setFullName(e.target.value)} />
                        {formErrors.fullName && <span className="error-text">{formErrors.fullName}</span>}
                    </div>

                    <div className="form-group">
                        <label>Email</label>
                        <input type="email" className="input" value={email} onChange={(e) => setEmail(e.target.value)} />
                        {formErrors.email && <span className="error-text">{formErrors.email}</span>}
                    </div>

                    <div className="form-group">
                        <label>Phone Number</label>
                        <input type="number" className="input" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
                        {formErrors.phoneNumber && <span className="error-text">{formErrors.phoneNumber}</span>}
                    </div>

                    <div className="form-group">
                        <label>Address</label>
                        <input type="text" className="input" value={address} onChange={(e) => setAddress(e.target.value)} />
                        {formErrors.address && <span className="error-text">{formErrors.address}</span>}
                    </div>

                    <div className="form-group">
                        <label>Hotel</label>
                        <input type="text" className="input" value={hotel} onChange={(e) => setHotel(e.target.value)} />
                        {formErrors.hotel && <span className="error-text">{formErrors.hotel}</span>}
                    </div>

                    <div className="form-group">
                        <label>Room Type</label>
                        <select className="input" value={roomType} onChange={(e) => setRoomType(e.target.value)}>
                            <option value="">Select a Room type</option>
                            <option value="single">Single</option>
                            <option value="family">Family</option>
                            <option value="group">Group</option>
                        </select>
                        {formErrors.roomType && <span className="error-text">{formErrors.roomType}</span>}
                    </div>

                    <div className="form-group">
                        <label>Guests</label>
                        <input type="number" className="input" value={guests} onChange={(e) => setGuests(e.target.value)} />
                        {formErrors.guests && <span className="error-text">{formErrors.guests}</span>}
                    </div>

                    <div className="form-group">
                        <label>Check-in Date</label>
                        <input type="date" className="input" value={checkInDate} onChange={(e) => setCheckInDate(e.target.value)} />
                        {formErrors.checkInDate && <span className="error-text">{formErrors.checkInDate}</span>}
                    </div>

                    <div className="form-group">
                        <label>Check-out Date</label>
                        <input type="date" className="input" value={checkOutDate} onChange={(e) => setCheckOutDate(e.target.value)} />
                        {formErrors.checkOutDate && <span className="error-text">{formErrors.checkOutDate}</span>}
                    </div>

                    <button type="submit" className="btn-submit">Save</button>
                </form>
            </div>
        </div>
    );
};

export default CreateHotelDetails;
