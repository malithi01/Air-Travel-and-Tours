import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
// Update the import path to match your project structure
import "../stylesheets/createHotel.css";

const CreateHotelDetails = () => {
    const location = useLocation();
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

    const today = new Date().toISOString().split("T")[0];
    const minCheckOutDate = checkInDate
        ? new Date(new Date(checkInDate).getTime() + 86400000).toISOString().split("T")[0]
        : today;

    //fetch the latest orderID and generate the next one
    const fetchLatestHotelBookingId = async () => {
        try {
            const responce = await axios.get("http://localhost:8000/hotel/latest");
            const latestBookingId = responce.data.latestBookingId;

            if (latestBookingId) {
                //extract numeric part and increment
                const numericPart = parseInt(latestBookingId.slice(1), 10) + 1;
                const newBookingId = `H${numericPart.toString().padStart(3, "0")}`;
                setHotelBookingID(newBookingId);
            } else {
                //if no bookings exist, start with H001
                setHotelBookingID("H001");
            }
        } catch (error) {
            console.error("Error fetching latest hotel booking ID:", error);
            setHotelBookingID("H001"); //fallback
        }
    };

    useEffect(() => {
        fetchLatestHotelBookingId();
        
        // Set hotel name from navigation state if available
        if (location.state && location.state.selectedHotel) {
            setHotel(location.state.selectedHotel);
        }
    }, [location.state]);

    // Validating the form details
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

        const maxGuestsPerRoomType = {
            single: 2,
            family: 4,
            group: 10
        };

        if (!guests.trim() || isNaN(guests) || parseInt(guests) <= 0) {
            errors.guests = "Number of guests must be a valid positive number";
            formIsValid = false;
        } else {
            const guestCount = parseInt(guests);
            const maxGuestsAllowed = maxGuestsPerRoomType[roomType]; // assume roomType holds selected room value

            if (maxGuestsAllowed && guestCount > maxGuestsAllowed) {
                errors.guests = `Maximum ${maxGuestsAllowed} guests allowed for a ${roomType} room`;
                formIsValid = false;
            }
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

    // Form submission function stays the same
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
        <div className="hotel-booking-container">
            <div className="hotel-booking-form-wrapper">
                <a href="/hotelDashBoard" className="hotel-booking-back-btn">
                    <span className="hotel-booking-back-link">Back</span>
                </a>

                <h1 className="hotel-booking-title">Hotel Booking</h1>

                <form onSubmit={sendData} className="hotelForm">
                    <div className="hotel-booking-form-group">
                        <label className="hotel-booking-label">Hotel Booking ID</label>
                        <input
                            type="text"
                            className="hotel-booking-input-12"
                            value={hotelBookingID}
                            onChange={(e) => setHotelBookingID(e.target.value)}
                            placeholder="Enter booking ID"
                        />
                        {formErrors.hotelBookingID &&
                            <span className="hotel-booking-error">{formErrors.hotelBookingID}</span>
                        }
                    </div>


                    <div className="hotel-booking-form-group">
                        <label className="hotel-booking-label">Full Name</label>
                        <input
                            type="text"
                            className="hotel-booking-input-12"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            placeholder="Enter your full name"
                        />
                        {formErrors.fullName &&
                            <span className="hotel-booking-error">{formErrors.fullName}</span>
                        }
                    </div>

                    <div className="hotel-booking-form-group">
                        <label className="hotel-booking-label">Email</label>
                        <input
                            type="email"
                            className="hotel-booking-input-12"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email address"
                        />
                        {formErrors.email &&
                            <span className="hotel-booking-error">{formErrors.email}</span>
                        }
                    </div>

                    <div className="hotel-booking-form-group">
                        <label className="hotel-booking-label">Phone Number</label>
                        <input
                            type="tel"
                            className="hotel-booking-input-12"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            placeholder="Enter your 10-digit phone number"
                        />
                        {formErrors.phoneNumber &&
                            <span className="hotel-booking-error">{formErrors.phoneNumber}</span>
                        }
                    </div>

                    <div className="hotel-booking-form-group">
                        <label className="hotel-booking-label">Address</label>
                        <input
                            type="text"
                            className="hotel-booking-input-12"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            placeholder="Enter your address"
                        />
                        {formErrors.address &&
                            <span className="hotel-booking-error">{formErrors.address}</span>
                        }
                    </div>

                    <div className="hotel-booking-form-group">
                        <label className="hotel-booking-label">Hotel</label>
                        <input
                            type="text"
                            className="hotel-booking-input-12"
                            value={hotel}
                            onChange={(e) => setHotel(e.target.value)}
                            placeholder="Enter hotel name"
                            readOnly={location.state && location.state.selectedHotel ? true : false}
                        />
                        {formErrors.hotel &&
                            <span className="hotel-booking-error">{formErrors.hotel}</span>
                        }
                    </div>

                    <div className="hotel-booking-form-group">
                        <label className="hotel-booking-label">Room Type</label>
                        <select
                            className="hotel-booking-select"
                            value={roomType}
                            onChange={(e) => setRoomType(e.target.value)}
                        >
                            <option value="">Select a Room type</option>
                            <option value="single">Single</option>
                            <option value="family">Family</option>
                            <option value="group">Group</option>
                        </select>
                        {formErrors.roomType &&
                            <span className="hotel-booking-error">{formErrors.roomType}</span>
                        }
                    </div>

                    <div className="hotel-booking-form-group">
                        <label className="hotel-booking-label">Guests</label>
                        <input
                            type="number"
                            className="hotel-booking-input-12"
                            value={guests}
                            onChange={(e) => setGuests(e.target.value)}
                            placeholder="Enter number of guests"
                        />
                        {formErrors.guests &&
                            <span className="hotel-booking-error">{formErrors.guests}</span>
                        }
                    </div>

                    <div className="hotel-booking-form-group">
                        <label className="hotel-booking-label">Check-in Date</label>
                        <input
                            type="date"
                            className="hotel-booking-input-12"
                            value={checkInDate}
                            onChange={(e) => setCheckInDate(e.target.value)}
                            min={today}
                        />
                        {formErrors.checkInDate &&
                            <span className="hotel-booking-error">{formErrors.checkInDate}</span>
                        }
                    </div>

                    <div className="hotel-booking-form-group">
                        <label className="hotel-booking-label">Check-out Date</label>
                        <input
                            type="date"
                            className="hotel-booking-input-12"
                            value={checkOutDate}
                            onChange={(e) => setCheckOutDate(e.target.value)}
                            min={minCheckOutDate}
                        />
                        {formErrors.checkOutDate &&
                            <span className="hotel-booking-error">{formErrors.checkOutDate}</span>
                        }
                    </div>

                    <button type="submit" className="hotel-booking-submit-btn">Save Booking</button>
                </form>
            </div>
        </div>
    );
};

export default CreateHotelDetails;