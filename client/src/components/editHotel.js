import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import "../stylesheets/editHotel.css";

const EditHotel = () => {
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

    const { id } = useParams();
    const navigate = useNavigate();

    const today = new Date().toISOString().split("T")[0];

    const minCheckOutDate = checkInDate
        ? new Date(new Date(checkInDate).getTime() + 86400000).toISOString().split("T")[0]
        : today;

    useEffect(() => {
        axios
            .get(`http://localhost:8000/hotels/${id}`)
            .then((res) => {
                const data = res.data.hotelDetails;
                setHotelBookingID(data.hotelBookingID);
                setFullName(data.fullName);
                setEmail(data.email);
                setPhoneNumber(data.phoneNumber);
                setAddress(data.address);
                setHotel(data.hotel);
                setRoomType(data.roomType);
                setGuests(data.guests.toString());
                setCheckInDate(
                    data.checkInDate ? new Date(data.checkInDate).toISOString().slice(0, 10) : ""
                );
                setCheckOutDate(
                    data.checkOutDate ? new Date(data.checkOutDate).toISOString().slice(0, 10) : ""
                );
            })
            .catch((err) => console.log("Error fetching hotel data", err));
    }, [id]);

    const validateForm = () => {
        const errors = {};
        let formIsValid = true;

        if (!hotelBookingID || hotelBookingID.trim() === "") {
            errors.hotelBookingID = "Booking ID is required";
            formIsValid = false;
        }

        if (!fullName || fullName.trim() === "" || !/^[a-zA-Z\s]+$/.test(fullName)) {
            errors.fullName = "Full name should contain letters only";
            formIsValid = false;
        }

        if (!email || email.trim() === "" || !/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i.test(email)) {
            errors.email = "Invalid email address";
            formIsValid = false;
        }

        if (!phoneNumber || (typeof phoneNumber === 'string' && phoneNumber.trim() === "")) {
            errors.phoneNumber = "Contact Number is required";
            formIsValid = false;
        } else if (!/^\d{10,12}$/.test(phoneNumber.toString())) {
            errors.phoneNumber = "Invalid Contact number. Must be 10-12 digits long.";
            formIsValid = false;
        }

        if (!address || address.trim() === "") {
            errors.address = "Address is required";
            formIsValid = false;
        }

        if (!hotel || hotel.trim() === "") {
            errors.hotel = "Hotel name is required";
            formIsValid = false;
        }

        if (!roomType || roomType.trim() === "") {
            errors.roomType = "Room type is required";
            formIsValid = false;
        }

        const maxGuestsPerRoomType = {
            Single: 2,
            Double: 4,
            Suite: 10
        };

        if (!guests || guests === "") {
            errors.guests = "Number of guests is required";
            formIsValid = false;
        } else {
            const guestCount = parseInt(guests);
            if (isNaN(guestCount) || guestCount <= 0) {
                errors.guests = "Number of guests must be a valid positive number";
                formIsValid = false;
            } else {
                const maxGuestsAllowed = maxGuestsPerRoomType[roomType];
                if (maxGuestsAllowed && guestCount > maxGuestsAllowed) {
                    errors.guests = `Maximum ${maxGuestsAllowed} guests allowed for a ${roomType} room`;
                    formIsValid = false;
                }
            }
        }

        if (!checkInDate) {
            errors.checkInDate = "Check-in Date is required";
            formIsValid = false;
        } else {
            const currentDate = new Date();
            currentDate.setHours(0, 0, 0, 0);
            const selectedDate = new Date(checkInDate);
            if (selectedDate < currentDate) {
                errors.checkInDate = "Check-in Date cannot be a past date";
                formIsValid = false;
            }
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

        if (!validateForm()) {
            return;
        }

        const confirmed = window.confirm("Are you sure you want to update this hotel booking?");
        if (!confirmed) return;

        try {
            const updatedHotelData = {
                hotelBookingID,
                fullName,
                email,
                phoneNumber,
                address,
                hotel,
                roomType,
                guests: parseInt(guests),
                checkInDate: new Date(checkInDate).toISOString(),
                checkOutDate: new Date(checkOutDate).toISOString(),
            };

            await axios.put(`http://localhost:8000/hotels/update/${id}`, updatedHotelData);
            alert("Updated Successfully!");
            navigate("/viewHotel");
        } catch (error) {
            console.error("Update failed!", error);
            alert("Failed to update booking. Please try again.");
        }
    };

    const handleBack = () => {
        navigate("/viewHotel");
    };

    return (
        <div className="edit-container">
            <div className="edit-card">
                <h2 className="edit-title">Update Hotel Booking</h2>
                <form onSubmit={updateData}>
                    <div className="editform-group">
                        <label>Hotel Booking ID</label>
                        <input
                            type="text"
                            value={hotelBookingID}
                            onChange={(e) => setHotelBookingID(e.target.value)}
                            className={formErrors.hotelBookingID ? "error" : ""}
                        />
                        {formErrors.hotelBookingID && (
                            <p className="editerror-message">{formErrors.hotelBookingID}</p>
                        )}
                    </div>

                    <div className="editform-group">
                        <label>Full Name</label>
                        <input
                            type="text"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            className={formErrors.fullName ? "error" : ""}
                        />
                        {formErrors.fullName && (
                            <p className="editerror-message">{formErrors.fullName}</p>
                        )}
                    </div>

                    <div className="editform-group">
                        <label>Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className={formErrors.email ? "error" : ""}
                        />
                        {formErrors.email && (
                            <p className="editerror-message">{formErrors.email}</p>
                        )}
                    </div>

                    <div className="editform-group">
                        <label>Phone Number</label>
                        <input
                            type="text"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            className={formErrors.phoneNumber ? "error" : ""}
                        />
                        {formErrors.phoneNumber && (
                            <p className="editerror-message">{formErrors.phoneNumber}</p>
                        )}
                    </div>

                    <div className="editform-group">
                        <label>Address</label>
                        <input
                            type="text"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            className={formErrors.address ? "error" : ""}
                        />
                        {formErrors.address && (
                            <p className="editerror-message">{formErrors.address}</p>
                        )}
                    </div>

                    <div className="editform-group">
                        <label>Hotel</label>
                        <input
                            type="text"
                            value={hotel}
                            onChange={(e) => setHotel(e.target.value)}
                            className={formErrors.hotel ? "error" : ""}
                        />
                        {formErrors.hotel && (
                            <p className="editerror-message">{formErrors.hotel}</p>
                        )}
                    </div>

                    <div className="editform-group">
                        <label>Room Type</label>
                        <select
                            value={roomType}
                            onChange={(e) => setRoomType(e.target.value)}
                            className={formErrors.roomType ? "error" : ""}
                        >
                            <option value="">Select a Room Type</option>
                            <option value="Single">Single</option>
                            <option value="Double">Double</option>
                            <option value="Suite">Suite</option>
                        </select>
                        {formErrors.roomType && (
                            <p className="editerror-message">{formErrors.roomType}</p>
                        )}
                    </div>

                    <div className="editform-group">
                        <label>Number of Guests</label>
                        <input
                            type="number"
                            value={guests}
                            onChange={(e) => setGuests(e.target.value)}
                            className={formErrors.guests ? "error" : ""}
                            min="1"
                        />
                        {formErrors.guests && (
                            <p className="editerror-message">{formErrors.guests}</p>
                        )}
                    </div>

                    <div className="editform-group">
                        <label>Check In Date</label>
                        <input
                            type="date"
                            value={checkInDate}
                            onChange={(e) => setCheckInDate(e.target.value)}
                            min={today}
                            className={formErrors.checkInDate ? "error" : ""}
                        />
                        {formErrors.checkInDate && (
                            <p className="editerror-message">{formErrors.checkInDate}</p>
                        )}
                    </div>

                    <div className="editform-group">
                        <label>Check out Date</label>
                        <input
                            type="date"
                            value={checkOutDate}
                            onChange={(e) => setCheckOutDate(e.target.value)}
                            min={minCheckOutDate}
                            className={formErrors.checkOutDate ? "error" : ""}
                        />
                        {formErrors.checkOutDate && (
                            <p className="editerror-message">{formErrors.checkOutDate}</p>
                        )}
                    </div>

                    <div className="button-group">
                        <button type="submit" className="update-btn">Update</button>
                        <button type="button" className="back-btn" onClick={handleBack}>Back</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditHotel;