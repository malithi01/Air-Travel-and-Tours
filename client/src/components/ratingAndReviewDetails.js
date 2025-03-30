import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../stylesheets/ratingAndReviewDetails.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faStar as solidStar, 
  faCheck, 
  faMapMarkerAlt, 
  faThumbsUp, 
  faShare 
} from '@fortawesome/free-solid-svg-icons';
import { faStar as regularStar } from '@fortawesome/free-regular-svg-icons';

const ViewRatingAndReviewDetails = () => {
  const [reviewDetails, setReviewDetails] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getReviewDetails = async () => {
      try {
        const res = await axios.get("http://localhost:8000/reviews_and_ratings");
        setReviewDetails(res.data.existingReviews);
      } catch (err) {
        if (err.response) {
          console.log(err.response.data.error);
        } else {
          console.log("Error occurred while processing your get request");
        }
      }
    };

    getReviewDetails();
  }, []);

  // Function to render stars based on rating
  const renderStars = (rating) => {
    const numRating = parseInt(rating, 10);
    return (
      <div className="stars-container">
        {[...Array(5)].map((_, index) => (
          <FontAwesomeIcon
            key={index}
            icon={index < numRating ? solidStar : regularStar}
            className="star"
          />
        ))}
      </div>
    );
  };

  const handleDelete = async (id) => {
    try {
      const confirmed = window.confirm(
        "Are you sure you want to delete this review?"
      );
      if (confirmed) {
        await axios
          .delete(`http://localhost:8000/reviews_and_rating/delete/${id}`)
          .then((res) => {
            alert(res.data.message);
            setReviewDetails(reviewDetails.filter((review) => review._id !== id));
          })
          .catch((err) => {
            if (err.response) {
              console.log(err.response.data.message);
            } else {
              console.log("Error occurred while processing your axios delete");
            }
          });
      }
    } catch (err) {
      console.log("handleDelete function failed! ERROR: " + err.message);
    }
  };

  // Format date to match example
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { year: 'numeric', month: 'long' };
    return date.toLocaleDateString(undefined, options);
  };

  return (
    <div className="reviews-container">
      {reviewDetails.length === 0 ? (
        <div className="no-reviews">No reviews found</div>
      ) : (
        reviewDetails.map((review) => (
          <div key={review._id} className="review-card">
            <div className="review-header">
              <div className="user-info">
                <div className="user-avatar ">
                  {/* Default avatar or first letter of name */}
                  {review.name && review.name.charAt(0).toUpperCase()}
                </div>
                <div className="user-details">
                  <h3 className="user-name">
                    {review.name || "Anonymous"}
                    <span className="verified-badge">
                      <FontAwesomeIcon icon={faCheck} /> Verified
                    </span>
                  </h3>
                  {renderStars(review.rating || "0")}
                </div>
              </div>
              <h2 className="review-title">
                {review.serviceType ? `${review.serviceType} Experience` : "Exceptional service"}
              </h2>
            </div>
            
            <div className="review-content">
              {review.review || "First-class experience from booking to arrival. The staff went above and beyond to ensure our comfort. Will definitely use this service again."}
            </div>
            
            <div className="review-metadata">
              <div className="review-date">
                {formatDate(review.date) || "December 2023"}
              </div>
            </div>
            
            <div className="review-actions">
              <button className="helpful-button">
                <FontAwesomeIcon icon={faThumbsUp} className="helpful-icon" />
                Helpful ({Math.floor(Math.random() * 50)})
              </button>
              <button className="share-button">
                <FontAwesomeIcon icon={faShare} className="share-icon" />
                Share
              </button>
            </div>
            
            <div className="button-container">
              <button
                className="update-button"
                onClick={() => navigate(`/editRatingAndReviews/${review._id}`)}
              >
                📝 Update
              </button>
              <button
                className="delete-button"
                onClick={() => handleDelete(review._id)}
              >
                🗑️ Delete
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default ViewRatingAndReviewDetails;