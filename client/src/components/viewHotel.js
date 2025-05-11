import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "../stylesheets/viewHotel.css";
import { useNavigate } from "react-router-dom";

const ViewHotelDetails = () => {
    const navigate = useNavigate();
    const [hotelDetails, setHotelDetails] = useState([]);
    const componentPDF = useRef();
    const [selectedHotel, setSelectedHotel] = useState(null);

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

    // Function to generate PDF report for a single hotel booking
    const generatePDF = (hotel) => {
        const currentDate = new Date().toLocaleDateString();
        
        // Create the content for the report
        const content = `
            <div class="hotel-booking-report">
                <h3>Booking ID: ${hotel.hotelBookingID}</h3>
                <table class="booking-details-table">
                    <tr>
                        <th>Full Name</th>
                        <td>${hotel.fullName}</td>
                    </tr>
                    <tr>
                        <th>Email</th>
                        <td>${hotel.email}</td>
                    </tr>
                    <tr>
                        <th>Phone Number</th>
                        <td>${hotel.phoneNumber}</td>
                    </tr>
                    <tr>
                        <th>Address</th>
                        <td>${hotel.address}</td>
                    </tr>
                    <tr>
                        <th>Hotel</th>
                        <td>${hotel.hotel}</td>
                    </tr>
                    <tr>
                        <th>Room Type</th>
                        <td>${hotel.roomType}</td>
                    </tr>
                    <tr>
                        <th>Guests</th>
                        <td>${hotel.guests}</td>
                    </tr>
                    <tr>
                        <th>Check-In Date</th>
                        <td>${hotel.checkInDate}</td>
                    </tr>
                    <tr>
                        <th>Check-Out Date</th>
                        <td>${hotel.checkOutDate}</td>
                    </tr>
                </table>
            </div>
        `;
        
        // Open a new window for the report
        const newWindow = window.open();
        newWindow.document.write(`
            <html>
                <head>
                    <title>Hotel Booking Report</title>
                    <style>
                        /* Print styles */
                        @media print {
                            button { display: none; }
                        }
                        body {
                            font-family: Arial, sans-serif;
                            line-height: 1.6;
                            margin: 20px;
                        }
                        .reportHeader {
                            text-align: center;
                            margin-bottom: 20px;
                        }
                        .imgContainer img {
                            max-width: 200px;
                            max-height: 100px;
                        }
                        .hotel-booking-report {
                            margin: 0 auto;
                            max-width: 800px;
                        }
                        .booking-details-table {
                            width: 100%;
                            border-collapse: collapse;
                            margin-top: 20px;
                        }
                        .booking-details-table th, .booking-details-table td {
                            border: 1px solid #ddd;
                            padding: 12px;
                        }
                        .booking-details-table th {
                            background-color: #f2f2f2;
                            text-align: left;
                            width: 30%;
                        }
                        .print-footer {
                            margin-top: 30px;
                            text-align: center;
                            font-size: 14px;
                            color: #666;
                        }
                        .print-button {
                            display: block;
                            margin: 20px auto;
                            padding: 10px 20px;
                            background-color: #4CAF50;
                            color: white;
                            border: none;
                            border-radius: 4px;
                            cursor: pointer;
                        }
                    </style>
                </head>
                <body>
                    <div class="reportHeader">
                        <div class="imgContainer">
                            <img src="/images/logo.png">
                        </div>
                        <h1>Hotel Booking Confirmation</h1>
                        <hr />
                    </div>
                    ${content}
                    <div class="print-footer">
                        <hr />
                        <p>Report Generated on ${currentDate}</p>
                    </div>
                    <button class="print-button" onclick="window.print(); return false;">Print Report</button>
                </body>
            </html>
        `);
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
                    <div className="button-group">
                        <button 
                            className="update-button"
                            onClick={() => navigate(`/editHotel/${hotel._id}`)}
                        >
                            📝 Update Order
                        </button>
                        <button
                            className="delete-button"
                            onClick={() => handleDelete(hotel._id)}
                        >
                            🗑️ Cancel Booking
                        </button>
                        <button
                            className="report-button"
                            onClick={() => generatePDF(hotel)}
                        >
                            📄 Generate Report
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ViewHotelDetails;