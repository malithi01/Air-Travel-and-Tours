import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import "../stylesheets/editRent.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as farStar } from '@fortawesome/free-regular-svg-icons';

const EditRatingAndReview = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [date, setDate] = useState("");
  const [serviceType, setServiceType] = useState("");
  const [review, setReview] = useState("");
  const [rating, setRating] = useState("");
   const [hover, setHover] = useState(0);
  const [formErrors, setFormErrors] = useState({});

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:8000/reviews_and_rating/${id}`)
      .then((res) => {
        const data = res.data.ratingAndReviewDetails;
        setName(data.name);
        setEmail(data.email);
        setServiceType(data.serviceType);
        setReview(data.review);
        setRating(data.rating);

        // ✅ Fix the date format issue
        if (data.date) {
          setDate(new Date(data.date).toISOString().split("T")[0]);
        }
      })
      .catch((err) => console.log("Error fetching data", err));
  }, [id]);

  const validateForm = () => {
    const errors = {};
    let formIsValid = true;

    if (!name.trim()) {
      errors.name = "Name is required";
      formIsValid = false;
    }

    if (!email.trim()) {
      errors.email = "Email address is required";
      formIsValid = false;
    } else if (!email.includes("@")) {
      errors.email = "Invalid email address";
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

  const updateData = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const confirmed = window.confirm(
      "Are you sure you want to update this Details?"
    );
    if (!confirmed) return;

    const updatedReviewData = {
      name,
      email,
      date,
      serviceType,
      review,
      rating,
    };

    axios
      .put(
        `http://localhost:8000/reviews_and_rating/update/${id}`,
        updatedReviewData
      )
      .then(() => {
        alert("Updated Successfully!");
        navigate("/ratingAndReviewDetails");
      })
      .catch(() => console.log("Update failed!"));
  };

  const handleRatingClick = (ratingValue) => {
    setRating(ratingValue);
  };

  return (
    <div className="editcontainer">
      <div className="editcard">
        <h2 className="edittitle">Update Rating And Review Details</h2>
        <form onSubmit={updateData}>
          <div className="editform-group">
            <label>Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={formErrors.name ? "error" : ""}
            />
            {formErrors.name && (
              <p className="editerror-message">{formErrors.name}</p>
            )}
          </div>

          <div className="editform-group">
            <label>Email</label>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={formErrors.email ? "error" : ""}
            />
            {formErrors.email && (
              <p className="editerror-message">{formErrors.email}</p>
            )}
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
            {formErrors.date && (
              <span className="error-text">{formErrors.date}</span>
            )}
          </div>

          <div className="editform-group">
            <label>Service Type</label>
            <select
              value={serviceType}
              onChange={(e) => setServiceType(e.target.value)}
            >
              <option value="">Select Service Type</option>
              <option value="flightBooking">Flight Booking</option>
              <option value="hotelBooking">Hotel Booking</option>
              <option value="carRental">Car Rental</option>
              <option value="packingAssistant">Packing Assistant</option>
              <option value="allServices">All Services</option>
            </select>
          </div>

          <div className="editform-group">
            <label>Review</label>
            <input
              type="text"
              value={review}
              onChange={(e) => setReview(e.target.value)}
            />
          </div>

<div className="form-group">
  <label>Rating</label>
  <div className="star-rating">
    {[...Array(5)].map((star, index) => {
      const ratingValue = index + 1;
      return (
        <span
          key={index}
          className="star"
          onClick={() => handleRatingClick(ratingValue)}
          onMouseEnter={() => setHover(ratingValue)}
          onMouseLeave={() => setHover(0)}
        >
          <FontAwesomeIcon 
            icon={ratingValue <= (hover || rating) ? faStar : farStar}
            color={ratingValue <= (hover || rating) ? "#ffc107" : "#e4e5e9"}
            size="1x" // Changed from "lg" to "2x" for larger stars
          />
        </span>
      );
    })}
    <span className="rating-value">{rating > 0 ? `${rating}/5` : ""}</span>
  </div>
  {formErrors.rating && <span className="error-text">{formErrors.rating}</span>}
</div>

          <button type="submit" className="update-btn">
            Save
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditRatingAndReview;
