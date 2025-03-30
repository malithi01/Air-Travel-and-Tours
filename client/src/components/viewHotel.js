import React, { useState, useEffect } from "react";
import axios from "axios";
import "../stylesheets/viewHotel.css";
import { useNavigate } from "react-router-dom"; // Correct import

const ViewHotelDetails = () => {
    const navigate = useNavigate(); // Move inside the component
    const [hotelDetails, setHotelDetails] = useState([]);

    useEffect(() => {
        const getHotelDetails = async () => {
            try {
                const res = await axios.get("http://localhost:8000/hotels");
                setHotelDetails(res.data.existingHotel);
                console.log("Status:" + res.data.success);
                console.log(res.data.message);
            } catch (err) {
                console.error(err.response ? err.response.data.error : "Error fetching data");
            }
        };
        getHotelDetails();
    }, []);

    const handleDelete = async (id) => {
        try {
            const confirmed = window.confirm(
                "Are you sure you want to cancel this booking?"
            );
            if (confirmed) {
                await axios.delete(`http://localhost:8000/hotels/delete/${id}`)
                    .then((res) => {
                        alert(res.data.message);
                        setHotelDetails(hotelDetails.filter((hotel) => hotel._id !== id));
                    })
                    .catch((err) => {
                        console.error(err.response ? err.response.data.message : "Error deleting");
                    });
            } else {
                alert("Deletion cancelled!");
            }
        } catch (err) {
            console.error("handleDelete function failed! ERROR: " + err.message);
        }
    };

    return (
        <div className="hotel-container">
            {hotelDetails.map((hotel, index) => (
                <div key={index} className="hotel-card">
                    <dl className="hotel-details">
                        <dd><h4>{hotel.hotelBookingID}</h4></dd>
                        <dd><strong>Full Name:</strong> {hotel.fullName}</dd>
                        <dd><strong>Email:</strong> {hotel.email}</dd>
                        <dd><strong>Phone Number:</strong> {hotel.phoneNumber}</dd>
                        <dd><strong>Address:</strong> {hotel.address}</dd>
                        <dd><strong>Hotel:</strong> {hotel.hotel}</dd>
                        <dd><strong>Room Type:</strong> {hotel.roomType}</dd>
                        <dd><strong>Guests:</strong> {hotel.guests}</dd>
                        <dd><strong>Check-In Date:</strong> {hotel.checkInDate}</dd>
                        <dd><strong>Check-Out Date:</strong> {hotel.checkOutDate}</dd>
                    </dl>
                    <button 
                        className="update-button"
                        onClick={() => navigate(`/editHotel/${hotel._id}`)} // Corrected navigate usage
                    >
                        📝 Update Order
                    </button>
                    <button
                        className="delete-button"
                        onClick={() => handleDelete(hotel._id)}
                    >
                        🗑️ Cancel Booking
                    </button>
                </div>
            ))}
        </div>
    );
};

export default ViewHotelDetails;
