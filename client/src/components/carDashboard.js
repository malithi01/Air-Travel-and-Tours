import React, { Component } from "react";
import "./../stylesheets/carDashboard.css";

export default class carDashboard extends Component {
  render() {
    return (
      <div>
        <div className="header">
          <div>
            <ul className="navbar">
              <div
                className="rDetails"
                style={{ marginRight: "150px", marginLeft: "50px" }}
              >
                <li style={{ alignItems: "center" }}>
                  <a class="active" href="">
                    Flight Booking
                  </a>
                </li>
              </div>
              <div
                className="rDetails"
                style={{ marginRight: "50px", marginLeft: "0px" }}
              >
                <li>
                  <a class="active" href="/viewProduct">
                    Hotel Booking
                  </a>
                </li>
              </div>
              {/* <div className="logo" style={{ margin: "0 auto" }}>
                <a href="/dashboard">
                  <img src="./images/logo.png" className="image"></img>
                  </a>
                </div> */}
              <div
                className="rDetails"
                style={{  textAlign: "center" }}
              >
                <li>
                  <a href="/viewProductCnt">Reviews and Ratings</a>
                </li>
              </div>
              <div
                className="pDetails"
                style={{ marginRight: "150px", marginLeft: "200px" }}
              >
                <li>
                  <a href="/viewProductCnt">Packing assistant</a>
                </li>
              </div>
            </ul>
          </div>
        </div>
        <br></br>

        <div className="car-dash-container">
          <h1 className="plantTopic">
            <br></br>
            Drive Your Way – Easy, Fast, Affordable
            <br />
            <br />
          </h1>
          <div class="row" style={{ marginBottom: "50px" }}>
            <div class="col-sm-4 mb-3 mb-sm-0">
              <div
                className="card"
                style={{
                  width: "18rem",
                  height: "13rem",
                  textAlign: "center",
                  borderRadius: "20px",
                  backgroundColor: "rgba(147, 203, 210, 0.6)",
                  marginTop: "10px",
                  paddingTop: "60px",
                  alignItems: "center",
                }}
              >
                {" "}
                <h2 style={{ color: "#1a2a6c", marginTop: "00px" }}>
                  Car <br /> 4 - 5 Passengers
                </h2>
                <img src="./images/car.jpg" className="image1"></img>
                <h3 style={{ color: "brown" }}>Price Per Day : Rs. 10,000.00</h3>
              </div>
            </div>
            <div class="col-sm-4 mb-3 mb-sm-0">
              <div
                className="card"
                style={{
                  width: "18rem",
                  height: "13rem",
                  textAlign: "center",
                  borderRadius: "20px",
                  backgroundColor: "rgba(147, 203, 210, 0.6)",
                  marginTop: "10px",
                  paddingTop: "60px",
                  alignItems: "center",
                }}
              >
                <h2 style={{ color: "#1a2a6c", marginTop: "00px" }}>
                  Van <br /> 10 - 12 Passengers
                </h2>
                <img src="./images/van.jpg" className="image2"></img>
                <h3 style={{ color: "brown" }}>Price Per Day : Rs. 17,000.00</h3>
              </div>
            </div>
            <div class="col-sm-4 mb-3 mb-sm-0">
              <div
                className="card"
                style={{
                  width: "18rem",
                  height: "13rem",
                  textAlign: "center",
                  borderRadius: "20px",
                  backgroundColor: "rgba(147, 203, 210, 0.6)",
                  marginTop: "10px",
                  paddingTop: "60px",
                  alignItems: "center",
                }}
              >
                {" "}
                <h2 style={{ color: "#1a2a6c", marginTop: "00px" }}>
                  Bike <br /> 2 Passengers
                </h2>
                <img src="./images/bick.jpg" className="image3"></img>
                <h3 style={{ color: "brown" }}>Price Per Day : Rs. 5,000.00</h3>
              </div>
            </div>
          </div>
          <div>
            <a href="/createRents">
              <button className="book-button">Book Now</button>
            </a>
          </div>
          <br></br>
          <div>
            <a href="/rentDetails">
              <button className="view-button">View Booking Details</button>
            </a>
          </div>
          <br></br>
          {/* <div
            className="card"
            style={{
              width: "78rem",
              height: "11rem",
              textAlign: "center",
              borderRadius: "20px",
              backgroundColor: "rgba(232, 239, 240, 0.8)",
              marginTop: "10px",
              paddingTop: "60px",
              alignItems: "center",
            }}
          ></div> */}
        </div>
      </div>
    );
  }
}
