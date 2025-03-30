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

    useEffect(() => {
        axios
            .get(`http://localhost:8000/hotels/${id}`)
            .then((res) => {
                const data = res.data.hotelDetails;
                setHotelBookingID(data.hotelBookingID);
                setFullName(data.fullName);
                setEmail(data.email);
                setPhoneNumber(data.email);
                setAddress(data.address);
                setHotel(data.hotel);
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

        if (!guests.trim() || isNaN(guests) || parseInt(guests) <= 0) {
            errors.guests = "Number of guests must be a valid positive number";
            formIsValid = false;
        }

        if (!checkInDate.trim()) {
            errors.checkInDate = "Check-in Date is required";
            formIsValid = false;
        } else {
            const currentDate = new Date();
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
        if (!validateForm()) return;

        const confirmed = window.confirm("Are you sure you want to update this hotel booking?");
        if (!confirmed) return;

        const updatedHotelData = {
            hotelBookingID,
            fullName,
            email,
            phoneNumber,
            address,
            hotel,
            roomType,
            guests,
            checkInDate: new Date(checkInDate).toISOString(),
            checkOutDate: new Date(checkOutDate).toISOString(),
        };

        axios
            .put(`http://localhost:8000/hotels/update/${id}`, updatedHotelData)
            .then(() => {
                alert("Updated Successfully!");
                navigate("/hotelDetails");
            })
            .catch(() => console.log("Update failed!"));
    };

    // const getOneDayLaterDate = () => {
    //     const today = new Date();
    //     today.setDate(today.getDate() + 2);
    //     return today.toISOString().slice(0, 16);
    // };

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
                            type="text"
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
                            className={formErrors.address ? "error" : ""}
                        />
                        {formErrors.hotel && (
                            <p className="editerror-message">{formErrors.hotel}</p>
                        )}
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

                    {/* <div className="edit-form-group">
                        <label>Check-in Date</label>
                        <input type="datetime-local" value={checkInDate} onChange={(e) => setCheckInDate(e.target.value)} />
                        {formErrors.checkInDate && <p className="edit-error-message">{formErrors.checkInDate}</p>}
                    </div>

                    <div className="edit-form-group">
                        <label>Check-out Date</label>
                        <input type="datetime-local" value={checkOutDate} onChange={(e) => setCheckOutDate(e.target.value)} />
                        {formErrors.checkOutDate && <p className="edit-error-message">{formErrors.checkOutDate}</p>}
                    </div> */}

                    <div className="editform-group">
                        <label>Check In Date</label>
                        <input
                            type="date"  // Change type to "date" to only select the date
                            value={checkInDate ? new Date(checkInDate).toISOString().slice(0, 10) : new Date().toISOString().slice(0, 10)}
                            onChange={(e) => setCheckInDate(e.target.value)}
                        />
                    </div>

                    <div className="editform-group">
                        <label>Check out Date</label>
                        <input
                            type="date"  // Change type to "date" to only select the date
                            value={checkInDate ? new Date(checkOutDate).toISOString().slice(0, 10) : new Date().toISOString().slice(0, 10)}
                            onChange={(e) => setCheckOutDate(e.target.value)}
                        />
                    </div>


                    <button type="submit" className="update-btn">Update</button>
                </form>
            </div>
        </div>
    );
};

export default EditHotel;
