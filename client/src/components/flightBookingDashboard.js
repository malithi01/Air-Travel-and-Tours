import React, { useState } from "react";
import "./../stylesheets/flightBookingDashboard.css";
import Header from "./header";
import Footer from "./footer";

export default function FlightBookingDashboard() {
  const [searchParams, setSearchParams] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSearchParams((prev) => ({ ...prev, [name]: value }));
  };

  const airlines = [
    {
      id: 1,
      name: "Emirates",
      logo: "./images/Emirates_logo.svg.png",
    },
    {
      id: 2,
      name: "Quater",
      logo: "./images/images.png",
    },
    {
      id: 3,
      name: "Sri Lankan",
      logo: "./images/sri-lankan-airlines-logo-png_seeklogo-131159.png",
    },
  ];

  return (
    <div>
      <Header />
      <div className="flight-dashboard">
        <div className="dashboard-header">
          <h1>Flight Booking</h1>
          <p>Search and book flights to your favorite destinations</p>
        </div>

        {/* <div className="search-container">
        <h2>Search Flights</h2>

        <div className="trip-type">
          <label>
            <input
              type="radio"
              name="tripType"
              value="roundtrip"
              defaultChecked
            />
            Round Trip
          </label>
          <label>
            <input type="radio" name="tripType" value="oneway" />
            One Way
          </label>
        </div>

        <div className="search-form">
          <div className="form-row">
            <div className="form-group">
              <label>From</label>
              <input
                type="text"
                name="from"
                placeholder="City or Airport"
                value={searchParams.from}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label>To</label>
              <input
                type="text"
                name="to"
                placeholder="City or Airport"
                value={searchParams.to}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Depart</label>
              <input
                type="date"
                name="departDate"
                value={searchParams.departDate}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label>Return</label>
              <input
                type="date"
                name="returnDate"
                value={searchParams.returnDate}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Passengers</label>
              <select
                name="passengers"
                value={searchParams.passengers}
                onChange={handleInputChange}
              >
                {[1, 2, 3, 4, 5, 6].map((num) => (
                  <option key={num} value={num}>
                    {num}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>Class</label>
              <select
                name="cabinClass"
                value={searchParams.cabinClass}
                onChange={handleInputChange}
              >
                <option value="economy">Economy</option>
                <option value="premium">Premium Economy</option>
                <option value="business">Business</option>
                <option value="first">First Class</option>
              </select>
            </div>
          </div>

          <button className="search-button">Search Flights</button>
        </div>
      </div> */}

        <div className="airlines-section">
          <h2>Our Partner Airlines</h2>
          <div className="airlines-container">
            {airlines.map((airline) => (
              <div className="airline-card" key={airline.id}>
                <div className="airline-logo-container">
                  <img
                    src={airline.logo}
                    alt={airline.name}
                    className="airline-logo"
                  />
                </div>
                <h3>{airline.name}</h3>
              </div>
            ))}
          </div>
        </div>

        <div className="booking-actions">
          <a href="/bookings/create" className="action-link">
            <button className="action-button primary">Book a Flight</button>
          </a>
          <a href="/bookingDetails" className="action-link">
            <button className="action-button secondary">
              View Booking Details
            </button>
          </a>
        </div>
      </div>
      <Footer />
    </div>
  );
}
