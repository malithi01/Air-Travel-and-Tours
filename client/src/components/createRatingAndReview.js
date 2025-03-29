import React, { useState, useEffect } from "react";
import axios from "axios";
import "../stylesheets/editRent.css";

const CreateRatingAndReview = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [date, setDate] = useState("");
  const [serviceType, setServiceType] = useState("");
  const [review, setReview] = useState("");
  const [rating, setRating] = useState("");
  const [formErrors, setFormErrors] = useState({});

  // Auto-generate today's date (YYYY-MM-DD format)
  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];
    setDate(today);
  }, []);

  // Form validation
  const validateForm = () => {
    const errors = {};
    let formIsValid = true;

    if (!name.trim()) {
      errors.name = "Name is required";
      formIsValid = false;
    }

    if (!email.trim()) {
      errors.email = "Email is required";
      formIsValid = false;
    }

    if (!date.trim()) {
      errors.date = "Date is required";
      formIsValid = false;
    }

    if (!serviceType.trim()) {
      errors.serviceType = "Service Type is required";
      formIsValid = false;
    }

    if (!review.trim()) {
      errors.review = "Review is required";
      formIsValid = false;
    }

    if (!rating.trim()) {
      errors.rating = "Rating is required";
      formIsValid = false;
    }

    setFormErrors(errors);
    return formIsValid;
  };

  const sendData = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      const newReviewData = { name, email, date, serviceType, review, rating };

      await axios.post("http://localhost:8000/reviews_and_ratings/save", newReviewData);

      alert("Details saved successfully");

      // Reset form fields except the auto-generated date
      setName("");
      setEmail("");
      setServiceType("");
      setReview("");
      setRating("");
    } catch (error) {
      console.error("Error occurred while processing axios post request:", error);
      alert(error.response?.data?.error || "Failed to save record");
    }
  };

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
              value={name}
            />
            {formErrors.name && <span className="error-text">{formErrors.name}</span>}
          </div>

          <div className="form-group">
            <label>Email</label>
            <input
              type="text"
              className={`input ${formErrors.email && "input-error"}`}
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
            {formErrors.email && <span className="error-text">{formErrors.email}</span>}
          </div>

          <div className="form-group">
            <label>Date</label>
            <input
              type="date"
              className={`input ${formErrors.date && "input-error"}`}
              value={date}
              onChange={(e) => setDate(e.target.value)}
              disabled 
            />
            {formErrors.date && <span className="error-text">{formErrors.date}</span>}
          </div>

          <div className="form-group">
            <label>Service Type</label>
            <select
              className={`input ${formErrors.serviceType && "input-error"}`}
              onChange={(e) => setServiceType(e.target.value)}
              value={serviceType}
            >
              <option value="">Select Service Type</option>
              <option value="flightBooking">Flight Booking</option>
              <option value="hotelBooking">Hotel Booking</option>
              <option value="carRental">Car Rental</option>
              <option value="packingAssistant">Packing Assistant</option>
            </select>
            {formErrors.serviceType && <span className="error-text">{formErrors.serviceType}</span>}
          </div>

          <div className="form-group">
            <label>Review</label>
            <input
              type="text"
              className={`input ${formErrors.review && "input-error"}`}
              onChange={(e) => setReview(e.target.value)}
              value={review}
            />
            {formErrors.review && <span className="error-text">{formErrors.review}</span>}
          </div>

          <div className="form-group">
            <label>Rating</label>
            <input
              type="text"
              className={`input ${formErrors.rating && "input-error"}`}
              onChange={(e) => setRating(e.target.value)}
              value={rating}
            />
            {formErrors.rating && <span className="error-text">{formErrors.rating}</span>}
          </div>

          <button type="submit" className="btn-submit">Save</button>
        </form>
      </div>
    </div>
  );
};

export default CreateRatingAndReview;
