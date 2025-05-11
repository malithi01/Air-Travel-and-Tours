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

  // Updated airlines with pricing information
  const airlines = [
    {
      id: 1,
      name: "Emirates",
      logo: "./images/Emirates_logo.svg.png",
      price: {
        Economy: 750,
        "Premium Economy": 1200,
        Business: 2500,
        "First Class": 4000
      }
    },
    {
      id: 2,
      name: "Qatar Airways",
      logo: "./images/images.png",
      price: {
        Economy: 800,
        "Premium Economy": 1300,
        Business: 2600,
        "First Class": 4200
      }
    },
    {
      id: 3,
      name: "Sri Lankan",
      logo: "./images/sri-lankan-airlines-logo-png_seeklogo-131159.png",
      price: {
        Economy: 650,
        "Premium Economy": 1100,
        Business: 2200,
        "First Class": 3500
      }
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

        {/* Search container commented out */}

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
                <div className="airline-pricing">
                  <p>Economy from ${airline.price.Economy}</p>
                  <p>Business from ${airline.price.Business}</p>
                </div>
                <a 
                  href={`/bookings/create?airline=${encodeURIComponent(airline.name)}&airlineData=${encodeURIComponent(JSON.stringify(airline))}`} 
                  className="book-now-btn"
                >
                  Book Now
                </a>
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