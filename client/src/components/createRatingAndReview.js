import React, { useState } from "react";
import axios from "axios";

const CreateRatingAndReview = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [description, setDescription] = useState("");
  const [formErrors, setFormErrors] = useState({});

  // Validating form details
  const validateForm = () => {
    const errors = {};
    let formIsValid = true;

    if (!name.trim()) {
      errors.name = "name ID is required";
      formIsValid = false;
    }

    if (!email.trim()) {
      errors.email = "email is required";
      formIsValid = false;
    }

    if (!description.trim()) {
      errors.description = "description is required";
      formIsValid = false;
    }

    // if (!pickUpLocation.trim()) {
    //   errors.pickUpLocation = "Pick Up Location is required";
    //   formIsValid = false;
    // }

    // if (!pickUpDate) {
    //   errors.pickUpDate = "Pick Up Date is required";
    //   formIsValid = false;
    // } else {
    //   const currentDate = new Date();
    //   const selectedDate = new Date(pickUpDate);
    //   if (selectedDate < currentDate) {
    //     errors.pickUpDate = "Pick Up Date cannot be a past date";
    //     formIsValid = false;
    //   }
    // }

    // if (!dropOffDate) {
    //   errors.dropOffDate = "Drop Off Date is required";
    //   formIsValid = false;
    // }

    // if (pickUpDate && dropOffDate) {
    //   const pickUp = new Date(pickUpDate);
    //   const dropOff = new Date(dropOffDate);

    //   if (dropOff < pickUp) {
    //     errors.dropOffDate = "Drop Off Date cannot be before Pick Up Date";
    //     formIsValid = false;
    //   }
    // }

    setFormErrors(errors);
    return formIsValid;
  };

  const sendData = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      const newRentData = {
        name,
        email,
        description,
      };

      await axios.post("/reviews_and_ratings/save", newReviewData);

      alert("Details saved successfully");
    } catch (error) {
      console.error("Error occurred while processing axios post request:", error);
      if (error.response && error.response.data && error.response.data.error) {
        alert(error.response.data.error);
      } else {
        alert("Failed to save record");
      }
    }

    // Reset form state
    setName("");
    setEmail("");
    setDescription("");  
  };

//   const getOneDayLaterDate = () => {
//     const today = new Date();
//     today.setDate(today.getDate() + 1);
//     return today.toISOString().split("T")[0];
//   };

  return (
    <div className="container">
      <button className="btn-back">
        <a href="/ratingAndReviewDetails" className="back-link">Back</a>
      </button>
      <div className="form-container">
        <h1 className="form-title">Ratings And Reviews</h1>
        <form onSubmit={sendData}>
          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              className={`input ${formErrors.name && "input-error"}`}
              onChange={(e) => setName(e.target.value)}
              value={carOrderid}
            />
            {formErrors.name && <span className="error-text">{formErrors.name}</span>}
          </div>

          <div className="form-group">
            <label>Email</label>
            <input
              type="text"
              className={`input ${formErrors.email && "input-error"}`}
              onChange={(e) => setEmailemail(e.target.value)}
              value={email}
            />
            {formErrors.email && <span className="error-text">{formErrors.email}</span>}
          </div>

          <div className="form-group">
            <label>Description</label>
            <select
              className={`input ${formErrors.vehicleType && "input-error"}`}
              onChange={(e) => setVehicleType(e.target.value)}
              value={vehicleType}
            >
              <option value="">Select a Vehicle type</option>
              <option value="Car">Car</option>
              <option value="Van">Van</option>
              <option value="Bike">Bike</option>
            </select>
            {formErrors.vehicleType && <span className="error-text">{formErrors.vehicleType}</span>}
          </div>

          <div className="form-group">
            <label>Pick Up Location</label>
            <input
              type="text"
              className={`input ${formErrors.pickUpLocation && "input-error"}`}
              onChange={(e) => setPickUpLocation(e.target.value)}
              value={pickUpLocation}
            />
            {formErrors.pickUpLocation && <span className="error-text">{formErrors.pickUpLocation}</span>}
          </div>

          <div className="form-group">
            <label>Pick Up Date</label>
            <input
              type="date"
              className={`input ${formErrors.pickUpDate && "input-error"}`}
              value={pickUpDate}
              min={getOneDayLaterDate()}
              onChange={(e) => setpickUpDate(e.target.value)}
            />
            {formErrors.pickUpDate && <span className="error-text">{formErrors.pickUpDate}</span>}
          </div>

          <div className="form-group">
            <label>Drop Off Location</label>
            <input
              type="text"
              className="input"
              onChange={(e) => setDropOffLocation(e.target.value)}
              value={dropOffLocation}
            />
          </div>

          <div className="form-group">
            <label>Drop Off Date</label>
            <input
              type="date"
              className={`input ${formErrors.dropOffDate && "input-error"}`}
              value={dropOffDate}
              min={new Date().toISOString().split("T")[0]}
              onChange={(e) => setDropOffDate(e.target.value)}
            />
            {formErrors.dropOffDate && <span className="error-text">{formErrors.dropOffDate}</span>}
          </div>

          <button type="submit" className="btn-submit">Save</button>
        </form>
      </div>
    </div>
  );
};

export default CreateRents;
