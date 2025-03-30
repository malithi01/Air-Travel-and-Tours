import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../stylesheets/ratingAndReview.css";

const ViewRatingAndReviewDetails = () => {
  const [RatingAndReviewDetails, setRatingAndReview] = useState([]);
   const navigate = useNavigate();

  useEffect(() => {
    const getRatingAndReviewDetails = async () => {
      try {
        const res = await axios.get("http://localhost:8000/reviews_and_ratings");
        setRatingAndReview(res.data.existingReviews);
        console.log("Status: " + res.data.success);
        console.log(res.data.message);
      } catch (err) {
        if (err.response) {
          console.log(err.response.data.error);
        } else {
          console.log("Error occurred while processing your get request");
        }
      }
    };

    getRatingAndReviewDetails();
  }, []);


const handleDelete = async (id) => {
  try {
    const confirmed = window.confirm(
      "Are you sure you want to delete this record?"
    );
    if (confirmed) {
      await axios
        .delete(`http://localhost:8000/reviews_and_rating/delete/${id}`)
        .then((res) => {
          alert(res.data.message);
          console.log(res.data.message);
          setRatingAndReview(RatingAndReviewDetails.filter((ratingAndReview) => ratingAndReview._id !== id));
        })
        .catch((err) => {
          if (err.response) {
            console.log(err.response.data.message);
          } else {
            console.log("Error occured while processing your axios delete");
          }
        });
    } else {
      alert("Deletion cancelled!");
    }
  } catch (err) {
    console.log("handleDelete function failed! ERROR: " + err.message);
  }
};

  return (
    <div className="d-flex flex-column align-items-center">
      {RatingAndReviewDetails.map((ratingAndReview, index) => (
        <div
          key={index}
          className="card text-center"
          style={{ width: "40rem", marginTop: "20px" }}
        >
          <dl className="row" style={{ padding: "20px" }}>
            <dd>
              <strong>Name:</strong> {ratingAndReview.name || "Loading..."}
            </dd>
            <dd>
              <strong>Email:</strong> {ratingAndReview.email || "Loading..."}
            </dd>
            <dd>
              <strong>Date:</strong> {ratingAndReview.date || "Loading..."}
            </dd>
            <dd>
              <strong>Service Type:</strong> {ratingAndReview.serviceType || "Loading..."}
            </dd>
            <dd>
              <strong>Review:</strong> {ratingAndReview.review || "Loading..."}
            </dd>
            <dd>
              <strong>Rating:</strong> {ratingAndReview.rating || "Loading..."}
            </dd>
          </dl>

          <div className="button-container">
            <button
              className="update-button"
              onClick={() => navigate(`/editRatingAndReviews/${ratingAndReview._id}`)}
            >
              📝 Update 
            </button>

            <button
              className="delete-button"
              onClick={() => handleDelete(ratingAndReview._id)}
            >
              🗑️ Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ViewRatingAndReviewDetails;
