import React, { Component } from "react";

export default class Footer extends Component {
  render() {
    return (
      <footer style={{
        backgroundColor: "#3a4a5a",
        color: "white",
        padding: "20px 0 10px 0",
        marginTop: "50px",
        boxShadow: "0 -2px 10px rgba(0,0,0,0.1)"
      }}>
        <div style={{
          maxWidth: "1200px",
          margin: "0 auto",
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
          padding: "0 20px"
        }}>
          {/* Company Info */}
          <div style={{ 
            flex: "1 1 200px", 
            marginBottom: "30px",
            marginRight: "50px", 
            marginLeft: "0px" 
          }}>
            <h3 style={{ 
              fontSize: "1.5rem", 
              marginBottom: "15px",
              color: "#75c8ae"
            }}>Travel Easy</h3>
            <p style={{ lineHeight: "1.6", fontSize: "0.9rem" }}>
              Your one-stop solution for all travel needs. We provide the best services for flights, 
              hotels, and travel planning to make your journey memorable.
            </p>
            <div style={{ marginTop: "20px" }}>
              {/* Social Media Icons */}
              <a href="#" style={{ color: "white", marginRight: "15px", fontSize: "1.2rem" }}>
                <i className="fab fa-facebook"></i>
              </a>
              <a href="#" style={{ color: "white", marginRight: "15px", fontSize: "1.2rem" }}>
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" style={{ color: "white", marginRight: "15px", fontSize: "1.2rem" }}>
                <i className="fab fa-instagram"></i>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div style={{ 
            flex: "1 1 200px", 
            marginBottom: "30px",
            marginLeft: "40px" // Added margin to create more space
          }}>
            <h4 style={{ 
              fontSize: "1.2rem", 
              marginBottom: "15px",
              color: "#75c8ae"
            }}>Quick Links</h4>
            <ul style={{ listStyle: "none", padding: 0 }}>
              <li style={{ marginBottom: "10px" }}>
                <a href="#" style={{ color: "#e8ecef", textDecoration: "none", fontSize: "0.9rem" }}>
                  About Us
                </a>
              </li>
              <li style={{ marginBottom: "10px" }}>
                <a href="#" style={{ color: "#e8ecef", textDecoration: "none", fontSize: "0.9rem" }}>
                  Services
                </a>
              </li>
              <li style={{ marginBottom: "10px" }}>
                <a href="#" style={{ color: "#e8ecef", textDecoration: "none", fontSize: "0.9rem" }}>
                  FAQ
                </a>
              </li>
              <li style={{ marginBottom: "10px" }}>
                <a href="#" style={{ color: "#e8ecef", textDecoration: "none", fontSize: "0.9rem" }}>
                  Contact Us
                </a>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div style={{ flex: "1 1 200px", marginBottom: "10px" }}>
            <h4 style={{ 
              fontSize: "1.2rem", 
              marginBottom: "15px",
              color: "#75c8ae"
            }}>Our Services</h4>
            <ul style={{ listStyle: "none", padding: 0 }}>
              <li style={{ marginBottom: "10px" }}>
                <a href="#" style={{ color: "#e8ecef", textDecoration: "none", fontSize: "0.9rem" }}>
                  Flight Booking
                </a>
              </li>
              <li style={{ marginBottom: "10px" }}>
                <a href="#" style={{ color: "#e8ecef", textDecoration: "none", fontSize: "0.9rem" }}>
                  Hotel Reservation
                </a>
              </li>
              <li style={{ marginBottom: "10px" }}>
                <a href="#" style={{ color: "#e8ecef", textDecoration: "none", fontSize: "0.9rem" }}>
                  Car Rental
                </a>
              </li>
              <li style={{ marginBottom: "10px" }}>
                <a href="#" style={{ color: "#e8ecef", textDecoration: "none", fontSize: "0.9rem" }}>
                  Ratings and Reviews
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div style={{ flex: "1 1 300px", marginBottom: "10px" }}>
            <h4 style={{ 
              fontSize: "1.2rem", 
              marginBottom: "15px",
              color: "#75c8ae"
            }}>Contact Us</h4>
            <p style={{ marginBottom: "10px", fontSize: "0.9rem" }}>
              <i className="fas fa-map-marker-alt" style={{ marginRight: "10px" }}></i>
              123 Travel Street, Colombo, Sri Lanka
            </p>
            <p style={{ marginBottom: "10px", fontSize: "0.9rem" }}>
              <i className="fas fa-phone" style={{ marginRight: "10px" }}></i>
              +1 234 567 8901
            </p>
            <p style={{ marginBottom: "10px", fontSize: "0.9rem" }}>
              <i className="fas fa-envelope" style={{ marginRight: "10px" }}></i>
              info@traveleasy.com
            </p>
          </div>
        </div>

        {/* Copyright */}
        <div style={{ 
          borderTop: "1px solid #5fa8d3", 
          marginTop: "20px", 
          paddingTop: "20px", 
          textAlign: "center",
          fontSize: "0.85rem"
        }}>
          <p>© {new Date().getFullYear()} Travel Easy. All rights reserved.</p>
          <p style={{ marginTop: "10px" }}>
            <a href="#" style={{ color: "#e8ecef", marginRight: "15px", textDecoration: "none" }}>Privacy Policy</a>
            <a href="#" style={{ color: "#e8ecef", marginRight: "15px", textDecoration: "none" }}>Terms of Service</a>
            <a href="#" style={{ color: "#e8ecef", textDecoration: "none" }}>Cookie Policy</a>
          </p>
        </div>
      </footer>
    );
  }
}