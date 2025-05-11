import React, { useState, useEffect } from "react";
import axios from "axios";
import "../stylesheets/ratingAndReviewsDashboard.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faStar as solidStar, 
  faCheck,
  faThumbsUp, 
  faShare,
  faPlane,
  faMapMarkedAlt,
  faUmbrellaBeach,
  faHotel,
  faFilter,
  faPencilAlt
} from '@fortawesome/free-solid-svg-icons';
import { faStar as regularStar } from '@fortawesome/free-regular-svg-icons';
import Header from "./header";
import Footer from "./footer";

const RatingAndReviewsDashboard = () => {
  const [reviewDetails, setReviewDetails] = useState([]);
  const [filteredReviews, setFilteredReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterRating, setFilterRating] = useState(0);
  const [filterType, setFilterType] = useState("all");
  const [averageRating, setAverageRating] = useState(0);
  const [ratingCounts, setRatingCounts] = useState([0, 0, 0, 0, 0]);
  const [activeSort, setActiveSort] = useState("newest");

  useEffect(() => {
    const getReviewDetails = async () => {
      setLoading(true);
      try {
        const res = await axios.get("http://localhost:8000/reviews_and_ratings");
        const reviews = res.data.existingReviews;
        setReviewDetails(reviews);
        setFilteredReviews(reviews);
        
        // Calculate average rating
        if (reviews.length > 0) {
          const total = reviews.reduce((sum, review) => sum + parseInt(review.rating || 0, 10), 0);
          setAverageRating((total / reviews.length).toFixed(1));
          
          // Count ratings by star
          const counts = [0, 0, 0, 0, 0];
          reviews.forEach(review => {
            const rating = parseInt(review.rating || 0, 10);
            if (rating > 0 && rating <= 5) {
              counts[rating - 1]++;
            }
          });
          setRatingCounts(counts);
        }
      } catch (err) {
        console.error("Error fetching reviews:", err);
      } finally {
        setLoading(false);
      }
    };

    getReviewDetails();
  }, []);

  useEffect(() => {
    // Filter and sort reviews when filters change
    let results = [...reviewDetails];
    
    // Filter by rating - ensure we're comparing correctly
    if (filterRating > 0) {
      results = results.filter(review => {
        const reviewRating = parseInt(review.rating, 10);
        return !isNaN(reviewRating) && reviewRating === filterRating;
      });
    }
    
    // Filter by service type - handle case sensitivity and missing values
    if (filterType !== "all") {
      results = results.filter(review => {
        const reviewServiceType = (review.serviceType || "").trim().toLowerCase();
        return reviewServiceType === filterType.toLowerCase();
      });
    }
    
    // Apply sorting
    if (activeSort === "highest") {
      results.sort((a, b) => parseInt(b.rating || 0, 10) - parseInt(a.rating || 0, 10));
    } else if (activeSort === "lowest") {
      results.sort((a, b) => parseInt(a.rating || 0, 10) - parseInt(b.rating || 0, 10));
    } else if (activeSort === "newest") {
      results.sort((a, b) => new Date(b.date) - new Date(a.date));
    } else if (activeSort === "oldest") {
      results.sort((a, b) => new Date(a.date) - new Date(b.date));
    }
    
    setFilteredReviews(results);
  }, [reviewDetails, filterRating, filterType, activeSort]);
  // Render stars for a given rating
  const renderStars = (rating) => {
    const numRating = parseInt(rating, 10);
    return (
      <div className="stars-container">
        {[...Array(5)].map((_, index) => (
          <FontAwesomeIcon
            key={index}
            icon={index < numRating ? solidStar : regularStar}
            className={index < numRating ? "star-filled" : "star-empty"}
          />
        ))}
      </div>
    );
  };

  // Format date to match example
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString(undefined, options);
  };

  // Get service type icon
  const getServiceIcon = (serviceType) => {
    switch ((serviceType || "").toLowerCase()) {
      case "flight":
        return faPlane;
      case "tour":
        return faMapMarkedAlt;
      case "hotel":
        return faHotel;
      case "vacation":
        return faUmbrellaBeach;
      default:
        return faPlane;
    }
  };

  // Filter by rating
  const handleRatingFilter = (rating) => {
    console.log("Current filter:", filterRating, "Selected:", rating);
    setFilterRating(filterRating === rating ? 0 : rating);
  };

  // Calculate percentage for rating bar
  const calculatePercentage = (count) => {
    if (reviewDetails.length === 0) return 0;
    return (count / reviewDetails.length) * 100;
  };

// Handle click on write review button
const handleWriteReview = () => {
  // Navigate to the review form page
  window.location.href = "/createRatingAndReview";
};

  return (
    <div>
      <Header />
      <div className="reviews-dashboard">
        <div className="reviews-header">
          <h1>Customer Reviews & Ratings</h1>
          <p>See what our travelers are saying about their experiences</p>
          
          {/* Write a Review Button */}
          <button className="write-review-button" onClick={handleWriteReview}>
            <FontAwesomeIcon icon={faPencilAlt} /> Write a Review
          </button>
        </div>

        <div className="reviews-stats-container">
          <div className="reviews-stats">
            <div className="average-rating">
              <div className="average-rating-number">{averageRating}</div>
              {renderStars(Math.round(averageRating))}
              <div className="total-reviews">{reviewDetails.length} reviews</div>
            </div>

            <div className="rating-bars">
              {[5, 4, 3, 2, 1].map((star) => (
                <div 
                  key={star} 
                  className={`rating-bar ${filterRating === star ? 'active' : ''}`}
                  onClick={() => handleRatingFilter(star)}
                >
                  <div className="rating-bar-label">{star} stars</div>
                  <div className="rating-bar-container">
                    <div 
                      className="rating-bar-fill" 
                      style={{ width: `${calculatePercentage(ratingCounts[star - 1])}%` }}
                    ></div>
                  </div>
                  <div className="rating-bar-count">{ratingCounts[star - 1]}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="filters-container">
          <div className="filters">
            <div className="filter-group">
              <label><FontAwesomeIcon icon={faFilter} /> Filter by:</label>
              <select 
                value={filterType} 
                onChange={(e) => setFilterType(e.target.value)}
                className="filter-select"
              >
                <option value="all">All Services</option>
                <option value="flight">Flights</option>
                <option value="tour">Tours</option>
                <option value="hotel">Hotels</option>
                <option value="vacation">Vacation Packages</option>
              </select>
            </div>

            <div className="sort-buttons">
              <button 
                className={activeSort === "newest" ? "active" : ""} 
                onClick={() => setActiveSort("newest")}
              >
                Newest
              </button>
              <button 
                className={activeSort === "highest" ? "active" : ""} 
                onClick={() => setActiveSort("highest")}
              >
                Highest Rating
              </button>
              <button 
                className={activeSort === "lowest" ? "active" : ""} 
                onClick={() => setActiveSort("lowest")}
              >
                Lowest Rating
              </button>
            </div>
          </div>
        </div>

        <div className="reviews-container">
          {loading ? (
            <div className="loading-spinner">Loading reviews...</div>
          ) : filteredReviews.length === 0 ? (
            <div className="no-reviews">
              <h3>No reviews found</h3>
              <p>Try changing your filter criteria or check back later for new reviews.</p>
              <button className="write-first-review-button" onClick={handleWriteReview}>
                <FontAwesomeIcon icon={faPencilAlt} /> Be the first to write a review
              </button>
            </div>
          ) : (
            filteredReviews.map((review) => (
              <div key={review._id} className="review-card">
                <div className="review-header">
                  <div className="user-info">
                    <div className="user-avatar" style={{ 
                      backgroundColor: `hsl(${(review.name?.charCodeAt(0) || 65) * 8}, 70%, 60%)` 
                    }}>
                      {/* Default avatar or first letter of name */}
                      {review.name ? review.name.charAt(0).toUpperCase() : "A"}
                    </div>
                    <div className="user-details">
                      <h3 className="user-name">
                        {review.name || "Anonymous"}
                        {review.verified && (
                          <span className="verified-badge">
                            <FontAwesomeIcon icon={faCheck} /> Verified
                          </span>
                        )}
                      </h3>
                      {renderStars(review.rating || "0")}
                    </div>
                  </div>
                  <div className="service-info">
                    <div className="service-type">
                      <FontAwesomeIcon icon={getServiceIcon(review.serviceType)} />
                      <span>{review.serviceType || "General"}</span>
                    </div>
                    <h2 className="review-title">
                      {review.title || `${review.serviceType || "Travel"} Experience`}
                    </h2>
                  </div>
                </div>
                
                <div className="review-content">
                  {review.review || "First-class experience from booking to arrival. The staff went above and beyond to ensure our comfort. Will definitely use this service again."}
                </div>
                
                {review.destination && (
                  <div className="review-destination">
                    <strong>Destination:</strong> {review.destination}
                  </div>
                )}
                
                <div className="review-metadata">
                  <div className="review-date">
                    <span>Posted on:</span> {formatDate(review.date) || "December 2023"}
                  </div>
                </div>
                
                <div className="review-actions">
                  <button className="helpful-button">
                    <FontAwesomeIcon icon={faThumbsUp} className="helpful-icon" />
                    Helpful ({review.helpfulCount || Math.floor(Math.random() * 50)})
                  </button>
                  <button className="share-button">
                    <FontAwesomeIcon icon={faShare} className="share-icon" />
                    Share
                  </button>
                </div>
              </div>
            ))
          )}
        </div>


      </div>
      <Footer />
    </div>
  );
};

export default RatingAndReviewsDashboard;