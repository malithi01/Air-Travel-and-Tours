import React, { Component } from 'react'
import "./../stylesheets/mainDashboard.css"

export default class Dashboard extends Component {
  render() {
    return (
      <div>
            <div className="header">
        <div>
         
          <ul className="navbar">
          <div className="nav-left">
          <li>
              <a class="active" href="#plantation">
                Plantation
              </a>
            </li>
            <li>
              <a href="#fertilizer">Fertilizer</a>
            </li>
            <li>
              <a href="#product">Product</a>
            </li>
            <li>
              <a href="#quality">Quality</a>
            </li>
           
          </div>
            <div className="logo">
              <img src="./images/logo.png" className="image"></img>
            </div>
            <div className="nav-right">
            <li>
              <a href="#disease">Diseases</a>
            </li>
            <li>
              <a href="#customer">Customer</a>
            </li>
            <li>
              <a href="#employee">Employee</a>
            </li>
            <li>
              <a href="#finance">Finance</a>
            </li>
            </div>

          </ul>
        </div>
      </div>
        <div id="plantation" class="overlay5">
          <div class="centered-content">
            <div class="image-container">
              <img
                src="../images/plantation.png"
                class="img2"
                alt="Read and Black"
                width="1300"
                height="425"
              />
              <div class="text-overlay">
                <button type="button" class="btn btn-primary btn-lg custom-btn4">
                <a
            href="/estateDetails"
            style={{ textDecoration: "none", color: "white" }}
          >
                  Enter Management
                  </a>
                </button>
              </div>
            </div>
          </div>
        </div>
        <div id="fertilizer" class="overlay5">
          <div class="centered-content">
            <div class="image-container">
              <img
                src="../images/fertilizer.png"
                class="img2"
                alt="Read and Black"
                width="1300"
                height="425"
              />
              <div class="text-overlay">
                <button type="button" class="btn btn-primary btn-lg custom-btn4">
                <a
            href="/fertilizationMain"
            style={{ textDecoration: "none", color: "white" }}
          >
                  Enter Management
                  </a>
                </button>
              </div>
            </div>
          </div>
        </div>
        <div id="product" class="overlay5">
          <div class="centered-content">
            <div class="image-container">
              <img
                src="../images/product.png"
                class="img2"
                alt="Read and Black"
                width="1300"
                height="425"
              />
              <div class="text-overlay">
                <button type="button" class="btn btn-primary btn-lg custom-btn4">
                <a
            href="/productDash"
            style={{ textDecoration: "none", color: "white" }}
          >
                  Enter Management
                  </a>
                </button>
              </div>
            </div>
          </div>
        </div>{" "}
        <div id="quality" class="overlay5">
          <div class="centered-content">
            <div class="image-container">
              <img
                src="../images/quality.png"
                class="img2"
                alt="Read and Black"
                width="1300"
                height="425"
              />
              <div class="text-overlay">
                <button type="button" class="btn btn-primary btn-lg custom-btn4">
                <a
            href="/viewQualityRecord"
            style={{ textDecoration: "none", color: "white" }}
          >
                  Enter Management
                  </a>
                </button>
              </div>
            </div>
          </div>
        </div>{" "}
        <div id="disease" class="overlay5">
          <div class="centered-content">
            <div class="image-container">
              <img
                src="../images/disease.png"
                class="img2"
                alt="Read and Black"
                width="1300"
                height="425"
              />
              <div class="text-overlay">
                <button type="button" class="btn btn-primary btn-lg custom-btn4">
                <a
            href="/diseaseDashboard"
            style={{ textDecoration: "none", color: "white" }}
          >
                  Enter Management
                  </a>
                </button>
              </div>
            </div>
          </div>
        </div>{" "}
        <div id="customer" class="overlay5">
          <div class="centered-content">
            <div class="image-container">
              <img
                src="../images/customer.png"
                class="img2"
                alt="Read and Black"
                width="1300"
                height="425"
              />
              <div class="text-overlay">
                <button type="button" class="btn btn-primary btn-lg custom-btn4">
                <a
            href="/viewCus"
            style={{ textDecoration: "none", color: "white" }}
          >
                  Enter Management
                  </a>
                </button>
              </div>
            </div>
          </div>
        </div>
        <div id="employee" class="overlay5">
          <div class="centered-content">
            <div class="image-container">
              <img
                src="../images/employee.png"
                class="img2"
                alt="Read and Black"
                width="1300"
                height="425"
              />
              <div class="text-overlay">
                <button type="button" class="btn btn-primary btn-lg custom-btn4">
                <a
            href="/viewEmployee"
            style={{ textDecoration: "none", color: "white" }}
          >
                  Enter Management
                  </a>
                </button>
              </div>
            </div>
          </div>
        </div>
        <div id="finance" class="overlay5">
          <div class="centered-content">
            <div class="image-container">
              <img
                src="../images/finance.png"
                class="img2"
                alt="Read and Black"
                width="1300"
                height="425"
              />
              <div class="text-overlay">
                <button type="button" class="btn btn-primary btn-lg custom-btn4">
                <a
            href="/viewFinanceDetails"
            style={{ textDecoration: "none", color: "white" }}
          >
                  Enter Management
                  </a>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}