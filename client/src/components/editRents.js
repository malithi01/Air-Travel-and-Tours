import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import "../stylesheets/editRent.css";
import Header from "./header";

const EditRents = () => {
  const [carOrderid, setCarOrderId] = useState("");
  const [nameOfRenter, setNameOfRenter] = useState("");
  const [telNo, SetTelNo] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [vehicleType, setVehicleType] = useState("");
  const [pickUpLocation, setPickUpLocation] = useState("");
  const [pickUpDate, setPickUpDate] = useState("");
  const [dropOffLocation, setDropOffLocation] = useState("");
  const [dropOffDate, setDropOffDate] = useState("");
  const [formErrors, setFormErrors] = useState({});

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:8000/rent/${id}`)
      .then((res) => {
        const data = res.data.rentDetails;
        setCarOrderId(data.carOrderid);
        setNameOfRenter(data.nameOfRenter);
        SetTelNo(data.telNo);
        setCountry(data.country);
        setCity(data.city);
        setVehicleType(data.vehicleType);
        setPickUpLocation(data.pickUpLocation);
        setPickUpDate(
          data.pickUpDate
            ? new Date(data.pickUpDate).toISOString().slice(0, 16)
            : ""
        );
        setDropOffLocation(data.dropOffLocation);
        setDropOffDate(
          data.dropOffDate
            ? new Date(data.dropOffDate).toISOString().slice(0, 16)
            : ""
        );
      })
      .catch((err) => console.log("Error fetching data"));
  }, [id]);

  const validateForm = () => {
    const errors = {};
    let formIsValid = true;

    if (!carOrderid.trim()) {
      errors.carOrderid = "Order ID is required";
      formIsValid = false;
    }

    if (!nameOfRenter.trim()) {
      errors.nameOfRenter = "Name is required";
      formIsValid = false;
    }

    if (!telNo.trim()) {
      errors.telNo = "Contact Number is required";
      formIsValid = false;
    } else if (!/^\d{10,12}$/.test(telNo)) {
      errors.telNo = "Invalid Contact number. Must be 10-12 digits long.";
      formIsValid = false;
    }

    if (!country.trim()) {
      errors.country = "Country is required";
      formIsValid = false;
    }

    if (!city.trim()) {
      errors.city = "City is required";
      formIsValid = false;
    }

    if (!vehicleType.trim()) {
      errors.vehicleType = "Vehicle type is required";
      formIsValid = false;
    }

    if (!pickUpLocation.trim()) {
      errors.pickUpLocation = "Pick Up Location is required";
      formIsValid = false;
    }

    if (!pickUpDate) {
      errors.pickUpDate = "Pick Up Date is required";
      formIsValid = false;
    } else {
      const currentDate = new Date();
      const selectedDate = new Date(pickUpDate);
      if (selectedDate < currentDate) {
        errors.pickUpDate = "Pick Up Date cannot be a past date";
        formIsValid = false;
      }
    }

    if (!dropOffDate) {
      errors.dropOffDate = "Drop Off Date is required";
      formIsValid = false;
    }

    if (pickUpDate && dropOffDate) {
      const pickUp = new Date(pickUpDate);
      const dropOff = new Date(dropOffDate);

      if (dropOff < pickUp) {
        errors.dropOffDate = "Drop Off Date cannot be before Pick Up Date";
        formIsValid = false;
      }
    }

    setFormErrors(errors);
    return formIsValid;
  };

  const updateData = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const confirmed = window.confirm(
      "Are you sure you want to update this Order?"
    );
    if (!confirmed) return;

    const updatedRentData = {
      carOrderid,
      nameOfRenter,
      telNo,
      country,
      city,
      vehicleType,
      pickUpLocation,
      pickUpDate: new Date(pickUpDate).toISOString(),
      dropOffLocation,
      dropOffDate: new Date(dropOffDate).toISOString(),
    };

    axios
      .put(`http://localhost:8000/rent/update/${id}`, updatedRentData)
      .then(() => {
        alert("Updated Successfully!");
        navigate("/rentDetails");
      })
      .catch(() => console.log("Update failed!"));
  };

  const getOneDayLaterDate = () => {
    const today = new Date();
    today.setDate(today.getDate() + 2);
    return today.toISOString().slice(0, 16);
  };

  return (
    <div>
      {" "}
      <Header />
      <div className="editcontainer">
        <button className="btn-back">
          <a href="/rentDetails" className="back-link">
            Back
          </a>
        </button>
        <div>
          <h2 className="edittitle">Update Rent Details</h2>
          <form onSubmit={updateData}>
            <div className="editform-group">
              <label>Order ID</label>
              <input
                type="text"
                value={carOrderid}
                onChange={(e) => setCarOrderId(e.target.value)}
                className={formErrors.carOrderid ? "error" : ""}
              />
              {formErrors.carOrderid && (
                <p className="editerror-message">{formErrors.carOrderid}</p>
              )}
            </div>

            <div className="editform-group">
              <label>Full Name</label>
              <input
                type="text"
                value={nameOfRenter}
                onChange={(e) => setNameOfRenter(e.target.value)}
                className={formErrors.nameOfRenter ? "error" : ""}
              />
              {formErrors.nameOfRenter && (
                <p className="editerror-message">{formErrors.nameOfRenter}</p>
              )}
            </div>

            <div className="editform-group">
              <label>Contact Number</label>
              <input
                type="text"
                value={telNo}
                onChange={(e) => SetTelNo(e.target.value)}
                className={formErrors.telNo ? "error" : ""}
              />
              {formErrors.telNo && (
                <p className="editerror-message">{formErrors.telNo}</p>
              )}
            </div>

            {/* <div className="editform-group">
              <label>Country</label>
              <input
                type="text"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                className={formErrors.country ? "error" : ""}
              />
              {formErrors.country && (
                <p className="editerror-message">{formErrors.country}</p>
              )}
            </div> */}

            <div className="editform-group">
              <label>Country</label>
              <select
                value={country}
                onChange={(e) => setCountry(e.target.value)}
              >
                <option value="">Select a Country</option>
                <option value="Sri Lanka">Sri Lanka</option>
                <option value="Bali">Bali</option>
                <option value="Thailand">Thailand</option>
              </select>
            </div>

            <div className="editform-group">
              <label>City</label>
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className={formErrors.city ? "error" : ""}
              />
              {formErrors.city && (
                <p className="editerror-message">{formErrors.city}</p>
              )}
            </div>

            <div className="editform-group">
              <label>Vehicle Type</label>
              <select
                value={vehicleType}
                onChange={(e) => setVehicleType(e.target.value)}
              >
                <option value="">Select a Vehicle</option>
                <option value="Car">Car</option>
                <option value="Van">Van</option>
                <option value="Bike">Bike</option>
              </select>
            </div>

            <div className="editform-group">
              <label>Pick Up Location</label>
              <input
                type="text"
                value={pickUpLocation}
                onChange={(e) => setPickUpLocation(e.target.value)}
              />
              {formErrors.pickUpLocation && (
                <span className="error-text">{formErrors.pickUpLocation}</span>
              )}
            </div>

            <div className="editform-group">
              <label>Pick Up Date</label>
              <input
                type="datetime-local"
                value={pickUpDate}
                min={getOneDayLaterDate()}
                onChange={(e) => setPickUpDate(e.target.value)}
              />
              {formErrors.pickUpDate && (
                <span className="error-text">{formErrors.pickUpDate}</span>
              )}
            </div>

            <div className="editform-group">
              <label>Drop Off Location</label>
              <input
                type="text"
                value={dropOffLocation}
                onChange={(e) => setDropOffLocation(e.target.value)}
              />
            </div>

            <div className="editform-group">
              <label>Drop Off Date</label>
              <input
                type="datetime-local"
                value={dropOffDate}
                min={
                  pickUpDate
                    ? new Date(new Date(pickUpDate).getTime() + 2)
                        .toISOString()
                        .slice(0, 16)
                    : new Date().toISOString().slice(0, 16)
                }
                onChange={(e) => setDropOffDate(e.target.value)}
              />
            </div>

            <button type="submit" className="update-btn">
              Update
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditRents;
