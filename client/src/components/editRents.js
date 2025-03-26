import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const EditRents = () => {
  const [carOrderid, setCarOrderId] = useState("");
  const [destination, setDestination] = useState("");
  const [vehicleType, setVehicleType] = useState("");
  const [pickUpLocation, setPickUpLocation] = useState("");
  const [pickUpDate, setpickUpDate] = useState("");
  const [dropOffLocation, setDropOffLocation] = useState("");
  const [dropOffDate, setDropOffDate] = useState("");
  const [formErrors, setFormErrors] = useState({});

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const getOneRent = async () => {
      await axios
        .get(`http://localhost:8000/rent/${id}`)
        .then((res) => {
          setCarOrderId(res.data.rentDetails.carOrderid);
          setDestination(res.data.rentDetails.destination);
          setVehicleType(res.data.rentDetails.vehicleType);
          setPickUpLocation(res.data.rentDetails.pickUpLocation);
          setpickUpDate(res.data.rentDetails.pickUpDate);
          setDropOffLocation(res.data.rentDetails.dropOffLocation);
          setDropOffDate(res.data.rentDetails.dropOffDate);
          console.log(res.data.message);
        })
        .catch((err) => {
          if (err.response) {
            console.log(err.response.data.error);
          } else {
            console.log("Error occured while processing your get request");
          }
        });
    };

    getOneRent();
  }, [id]);

  // Validating form details
  const validateForm = () => {
    const errors = {};
    let formIsValid = true;

    if (!carOrderid.trim()) {
      errors.carOrderid = "Order ID is required";
      formIsValid = false;
    }

    if (!destination.trim()) {
      errors.destination = "Destination is required";
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

    if (!validateForm()) {
      return;
    }

    try {
      const confirmed = window.confirm(
        "Are you sure you want to update this Order?"
      );
      if (confirmed) {
        let updatedRentData = new FormData();
        updatedRentData.append("carOrderid", carOrderid);
        updatedRentData.append("destination", destination);
        updatedRentData.append("vehicleType", vehicleType);
        updatedRentData.append("pickUpLocation", pickUpLocation);
        updatedRentData.append("pickUpDate", pickUpDate);
        updatedRentData.append("dropOffLocation", dropOffLocation);
        updatedRentData.append("dropOffDate", dropOffDate);

        await axios
          .put(`http://localhost:8000/rent/update/${id}`, updatedRentData)
          .then((res) => {
            alert(res.data.success);
            console.log(res.data.success);
            navigate("/rentDetails");
          })
          .catch((err) => {
            if (err.response) {
              console.log(err.response.data.success);
            } else {
              console.log("Error occured while processing your put request");
            }
          });
      } else {
        alert("Update cancelled!");
      }
    } catch (err) {
      console.log("Update failed!");
    }
  };

  const getOneDayLaterDate = () => {
    const today = new Date();
    today.setDate(today.getDate() + 1);
    return today.toISOString().split("T")[0];
  };

  return (
    <div className="col-md-8 mt-4 mx-auto">
      <div
        className="card"
        style={{
          backgroundColor: "rgba(255, 255, 255, 0.7)",
          borderRadius: "10px",
          marginTop: "110px",
          marginBottom: "20px",
        }}
      >
        <h1
          className="h3 mb-3 font-weight-normal"
          style={{ textAlign: "center", marginTop: "10px" }}
        >
          Update Rent details
        </h1>
        <form
          className="needs-validation"
          style={{ marginLeft: "10px", marginRight: "10px" }}
          noValidate
          onSubmit={updateData}
        >
          <div className="form-group" style={{ marginBottom: "15px" }}>
            <label style={{ marginBottom: "5px" }}>Order ID</label>
            <input
              type="text"
              className={`form-control ${
                formErrors.carOrderid && "is-invalid"
              }`}
              name="carOrderid"
              onChange={(e) => setCarOrderId(e.target.value)}
              value={carOrderid}
              required
            />
            {formErrors.carOrderid && (
              <div className="invalid-feedback">{formErrors.carOrderid}</div>
            )}
          </div>

          <div className="form-group" style={{ marginBottom: "15px" }}>
            <label style={{ marginBottom: "5px" }}>Destination</label>
            <input
              type="text"
              className={`form-control ${
                formErrors.destination && "is-invalid"
              }`}
              name="destination"
              onChange={(e) => setDestination(e.target.value)}
              value={destination}
              required
            />
            {formErrors.destination && (
              <div className="invalid-feedback">{formErrors.destination}</div>
            )}
          </div>

          <div className="form-group" style={{ marginBottom: "15px" }}>
            <label className="col-sm-2 col-form-label"> Vehicle Type </label>
            <div className="col-sm-8">
              <select
                className="form-select"
                name="vehicleType"
                value={vehicleType}
                onChange={(e) => setVehicleType(e.target.value)}
              >
                <option value="">Select a Vehicle type</option>
                <option value="Car">Car</option>
                <option value="Van">Van</option>
                <option value="Bike">Bike</option>
              </select>
            </div>
          </div>

          <div className="form-group" style={{ marginBottom: "15px" }}>
            <label style={{ marginBottom: "5px" }}>Pick Up Location</label>
            <input
              type="text"
              className={`form-control ${
                formErrors.pickUpLocation && "is-invalid"
              }`}
              name="pickUpLocation"
              onChange={(e) => setPickUpLocation(e.target.value)}
              value={pickUpLocation}
              required
            />
            {formErrors.pickUpLocation && (
              <div className="invalid-feedback">{formErrors.pickUpLocation}</div>
            )}
          </div>

          <div className="form-group" style={{ marginBottom: "15px" }}>
            <label style={{ marginBottom: "5px" }}>Pick Up Date</label>
            <input
              type="datetime-local"
              className={`form-control ${
                formErrors.pickUpDate && "is-invalid"
              } `}
              name="pickUpDate"
              value={pickUpDate}
              min={getOneDayLaterDate()}
              onChange={(e) => setpickUpDate(e.target.value)}
              required
            />
            {formErrors.pickUpDate && (
              <div className="invalid-feedback">
                {formErrors.pickUpDate}
              </div>
            )}
          </div>

          <div className="form-group" style={{ marginBottom: "15px" }}>
            <label style={{ marginBottom: "5px" }}>Drop Off Location</label>
            <input
              type="text"
              className={`form-control ${
                formErrors.dropOffLocation && "is-invalid"
              }`}
              name="dropOffLocation"
              onChange={(e) => setDropOffLocation(e.target.value)}
              value={dropOffLocation}
              required
            />
            {formErrors.dropOffLocation && (
              <div className="invalid-feedback">{formErrors.dropOffLocation}</div>
            )}
          </div>

          <div className="form-group" style={{ marginBottom: "15px" }}>
            <label style={{ marginBottom: "5px" }}>Drop off Date</label>
            <input
              type="date"
              className={`form-control ${
                formErrors.dropOffDate && "is-invalid"
              } `}
              name="dropOffDate"
              value={dropOffDate}
              min={new Date().toISOString().split("T")[0]}
              onChange={(e) => setDropOffDate(e.target.value)}
              required
            />
            {formErrors.dropOffDate && (
              <div className="invalid-feedback">
                {formErrors.dropOffDate}
              </div>
            )}
          </div>

          <button
            className="btn btn-success"
            type="submit"
            style={{ marginTop: "15px" }}
          >
            &nbsp;Update
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditRents;
