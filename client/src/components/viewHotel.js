import React, { useState, useEffect } from "react";
import axios from "axios";

const ViewHotelDetails = () => {
    const [HotelDetails, setHotels] = useState([]);

    useEffect(() => {
        const getHotelDetails = async () => {
            try {
                const res = await axios.get("http://localhost:8000/hotel");
                setHotels(res.data.existingHotel);
                console.log("Status:" + res.data.success);
                console.log(res.data.message);
            } catch (err) {
                if (err.response) { 
                    console.log(err.response.data.error);
                } else {
                    console.log("Error occured while processing your get request");
                }
            }
        };
        getHotelDetails();
    }, []);

    return (
        <div className="d-flex flex-column align-items-center">
            {HotelDetails.map((hotel, index) => (
                <div
                    key={index}
                    className="card text-center"
                    style={{ width: "40rem", marginTop: "20px" }}
                >
                    <dl className="row" style={{ padding: "20px" }}>
                        <dd>
                            <h4 style={{ textAlign: "center" }}>{hotel.hotelid}</h4>
                        </dd>
                        <dd>
                            <strong>Full Name : </strong> {hotel.fullName || "Loading..."}
                        </dd>
                        <dd>
                            <strong>Email : </strong> {hotel.email || "Loading..."}
                        </dd>
                        <dd>
                            <strong>Phone Number : </strong> {hotel.phoneNumber || "Loading..."}
                        </dd>
                        <dd>
                            <strong>Address : </strong> {hotel.address || "Loading..."}
                        </dd>
                        <dd>
                            <strong>Hotel : </strong> {hotel.hotel || "Loading..."}
                        </dd>
                        <dd>
                            <strong>Room Type : </strong> {hotel.roomType || "Loading..."}
                        </dd>
                        <dd>
                            <strong>Number of Guests:</strong> {hotel.guests || "Loading..."}
                        </dd>
                        <dd>
                            <strong>Check in Date:</strong> {hotel.checkInDate || "Loading..."}
                        </dd>
                        <dd>
                            <strong>Check out Date:</strong> {hotel.checkOutDate || "Loading..."}
                        </dd>
                    </dl>
                </div>
            ))}
        </div>
    );
};

export default ViewHotelDetails;