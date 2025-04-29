import React, { Component } from "react";
import "./../stylesheets/carDashboard.css";

export default class header extends Component {
  render() {
    return (
      <div>
        <div className="header" style={{margin:"none"}}>
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
                  <a class="active" href="/hotelDashboard">
                    Hotel Booking
                  </a>
                </li>
              </div>

              <div
                className="rDetails"
                style={{  marginRight: "50px", marginLeft: "50px" }}
              >
                <li>
                  <a href="/carDashboard">Car Rental</a>
                </li>
              </div>
              {/* <div className="logo" style={{ margin: "0 auto" }}>
                <a href="/dashboard">
                  <img src="./images/logo.png" className="image"></img>
                  </a>
                </div> */}
                
              <div
                className="rDetails"
                style={{  marginRight: "50px", marginLeft: "50px" }}
              >
                <li>
                  <a href="/viewProductCnt">Reviews and Ratings</a>
                </li>
              </div>
              <div
                className="pDetails"
                style={{ marginRight: "50px", marginLeft: "200px" }}
              >
                <li>
                  <a href="/viewProductCnt">Packing assistant</a>
                </li>
              </div>
            </ul>
          </div>
        </div>
        <br></br>
      </div>
    );
  }
}
