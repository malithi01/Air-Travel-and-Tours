import React, { useState, useEffect } from "react";
import axios from "axios";

const ViewRatingAndReviewDetails = () => {
  const [RatingAndReviewDetails, setRatingAndReview] = useState([]);

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

//     //filter RatingDetails based on searchCustomer
//   const filteredCustomer = RatingDetails.filter((rate) =>
//     rate.carOrderid.toLowerCase().includes(searchCustomer.toLowerCase())
//   );

  return (
    <div className="d-flex flex-column align-items-center">
      {RatingAndReviewDetails.map((rating, index) => (
        <div
          key={index}
          className="card text-center"
          style={{ width: "40rem", marginTop: "20px" }}
        >
          <dl className="row" style={{ padding: "20px" }}>
            {/* <dd>
              <h4 style={{ textAlign: "center" }}>{rating.carOrderid}</h4>
            </dd> */}
            <dd>
              <strong>Name:</strong> {rating.name || "Loading..."}
            </dd>
            <dd>
              <strong>Email:</strong> {rating.email || "Loading..."}
            </dd>
            <dd>
              <strong>Description:</strong> {rating.description || "Loading..."}
            </dd>
          </dl>
        </div>
      ))}
    </div>
  );
};

export default ViewRatingAndReviewDetails;
