import React, { Component } from "react";
import "./../stylesheets/carDashboard.css";
import Header from "./header";
import Footer from "./footer";

export default class CarDashboard extends Component {
  render() {
    return (
      <div className="dashboard-wrapper">
        <Header />
        <div className="car-dash-container">
          <h1 className="dashboard-title">
            Drive Your Way – Easy, Fast, Affordable
          </h1>
          
          <div className="vehicle-cards-container">
            <div className="vehicle-card car">
              <div className="vehicle-info">
                <h2 className="vehicle-type">Car</h2>
                <p className="passenger-count">4 - 5 Passengers</p>
              </div>
              <div className="vehicle-image-container">
                <img src="./images/car.png" alt="Car" className="vehicle-image" />
              </div>
              <p className="vehicle-price">Price Per Day: Rs. 10,000.00</p>
            </div>

            <div className="vehicle-card van">
              <div className="vehicle-info">
                <h2 className="vehicle-type">Van</h2>
                <p className="passenger-count">10 - 12 Passengers</p>
              </div>
              <div className="vehicle-image-container">
                <img src="./images/van.png" alt="Van" className="vehicle-image" />
              </div>
              <p className="vehicle-price">Price Per Day: Rs. 17,000.00</p>
            </div>

            <div className="vehicle-card bike">
              <div className="vehicle-info">
                <h2 className="vehicle-type">Bike</h2>
                <p className="passenger-count">2 Passengers</p>
              </div>
              <div className="vehicle-image-container">
                <img src="./images/bike.png" alt="Bike" className="vehicle-image" />
              </div>
              <p className="vehicle-price">Price Per Day: Rs. 5,000.00</p>
            </div>
          </div>
          
          <div className="action-buttons">
            <a href="/createRents" className="action-link">
              <button className="book-button">Book Now</button>
            </a>
            <a href="/rentDetails" className="action-link">
              <button className="view-button">View Booking Details</button>
            </a>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}