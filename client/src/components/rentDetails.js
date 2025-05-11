import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../stylesheets/viewRent.css";
import Header from "./header";
import Footer from "./footer";
import { useAuth } from "../context/AuthContext";

const ViewRentDetails = () => {
  const [rentDetails, setRents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const getRentDetails = async () => {
      setIsLoading(true);
      try {
        const res = await axios.get("http://localhost:8000/rent");
        setRents(res.data.existingRents);
        console.log("Status: " + res.data.success);
        console.log(res.data.message);
      } catch (err) {
        if (err.response) {
          console.log(err.response.data.error);
        } else {
          console.log("Error occurred while processing your get request");
        }
      } finally {
        setIsLoading(false);
      }
    };

    getRentDetails();
  }, []);

  // Function to calculate price
  const calculateTotalPrice = (vehicleType, pickUpDate, dropOffDate) => {
    const dailyRates = {
      car: 10000,
      van: 17000,
      bike: 5000,
    };

    const startDate = new Date(pickUpDate);
    const endDate = new Date(dropOffDate);
    const diffTime = Math.abs(endDate - startDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) || 1; // Minimum 1 day
    const dailyRate = dailyRates[vehicleType.toLowerCase()] || 0;

    return dailyRate * diffDays;
  };

  // Function to calculate rental duration in days
  const calculateDuration = (pickUpDate, dropOffDate) => {
    const startDate = new Date(pickUpDate);
    const endDate = new Date(dropOffDate);
    const diffTime = Math.abs(endDate - startDate);
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24)) || 1; // Minimum 1 day
  };

  // Format date for better readability
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Implementing handleDelete function
  const handleDelete = async (id) => {
    try {
      const confirmed = window.confirm(
        "Are you sure you want to cancel this booking?"
      );
      if (confirmed) {
        await axios
          .delete(`http://localhost:8000/rent/delete/${id}`)
          .then((res) => {
            alert(res.data.message);
            console.log(res.data.message);
            setRents(rentDetails.filter((rent) => rent._id !== id));
          })
          .catch((err) => {
            if (err.response) {
              console.log(err.response.data.message);
            } else {
              console.log("Error occurred while processing your axios delete");
            }
          });
      } else {
        alert("Deletion cancelled!");
      }
    } catch (err) {
      console.log("handleDelete function failed! ERROR: " + err.message);
    }
  };

  if (isLoading) {
    return (
      <div className="rent-container">
        <h1 className="page-title">Loading Booking Details...</h1>
      </div>
    );
  }

  return (
    <div>
      <Header />
      <button className="btn-home">
        <a href="/carDashboard" className="back-link">
          Home
        </a>
      </button>
      <div className="rent-container">
        <h1 className="page-title">View Booking Details</h1>

        {rentDetails.length === 0 ? (
          <div className="rent-card">
            <p style={{ textAlign: "center", padding: "20px" }}>
              No bookings found. Create a new booking to get started.
            </p>
          </div>
        ) : (
          rentDetails.map((rent, index) => (
            <div key={index} className="rent-card">
              <div className="card-header">
                <h3>Rental Details</h3>
                <span className="order-id-badge">
                  Order ID: {rent.carOrderid || "N/A"}
                </span>
              </div>

              {/* Customer Information Section */}
              <div className="customer-section">
                <div className="customer-info">
                  <h4>Customer Information</h4>
                  <div className="info-item">
                    <div className="info-label">Full Name</div>
                    <div className="info-value">
                      {rent.nameOfRenter || "Not provided"}
                    </div>
                  </div>
                  <div className="info-item">
                    <div className="info-label">Contact Number</div>
                    <div className="info-value">
                      {rent.telNo || "Not provided"}
                    </div>
                  </div>
                </div>

                <div className="customer-info">
                  <h4>Location Information</h4>
                  <div className="info-item">
                    <div className="info-label">Country</div>
                    <div className="info-value">
                      {rent.country || "Not provided"}
                    </div>
                  </div>
                  <div className="info-item">
                    <div className="info-label">City</div>
                    <div className="info-value">
                      {rent.city || "Not provided"}
                    </div>
                  </div>
                </div>
              </div>

              {/* Travel Information Section */}
              <div className="travel-section">
                <h4>Travel Details</h4>
                <div className="travel-info">
                  <div className="travel-detail">
                    <div className="travel-icon">🚗</div>
                    <div className="travel-content">
                      <div className="travel-label">Vehicle Type</div>
                      <div className="travel-value">
                        {rent.vehicleType || "Not specified"}
                      </div>
                    </div>
                  </div>

                  <div className="travel-detail">
                    <div className="travel-icon">⏱️</div>
                    <div className="travel-content">
                      <div className="travel-label">Duration</div>
                      <div className="travel-value">
                        {calculateDuration(rent.pickUpDate, rent.dropOffDate)}{" "}
                        days
                      </div>
                    </div>
                  </div>

                  <div className="travel-detail">
                    <div className="travel-icon">📍</div>
                    <div className="travel-content">
                      <div className="travel-label">Pick Up Location</div>
                      <div className="travel-value">
                        {rent.pickUpLocation || "Not specified"}
                      </div>
                    </div>
                  </div>

                  <div className="travel-detail">
                    <div className="travel-icon">📆</div>
                    <div className="travel-content">
                      <div className="travel-label">Pick Up Date</div>
                      <div className="travel-value">
                        {formatDate(rent.pickUpDate)}
                      </div>
                    </div>
                  </div>

                  <div className="travel-detail">
                    <div className="travel-icon">🏁</div>
                    <div className="travel-content">
                      <div className="travel-label">Drop Off Location</div>
                      <div className="travel-value">
                        {rent.dropOffLocation || "Not specified"}
                      </div>
                    </div>
                  </div>

                  <div className="travel-detail">
                    <div className="travel-icon">📅</div>
                    <div className="travel-content">
                      <div className="travel-label">Drop Off Date</div>
                      <div className="travel-value">
                        {formatDate(rent.dropOffDate)}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Pricing Table */}
              <table className="rent-details-table">
                <tbody>
                  <tr>
                    <td>Vehicle Daily Rate</td>
                    <td>
                      {rent.vehicleType?.toLowerCase() === "car" &&
                        "Rs 10,000 "}
                      {rent.vehicleType?.toLowerCase() === "van" &&
                        "Rs 17,000 Rs"}
                      {rent.vehicleType?.toLowerCase() === "bike" &&
                        "Rs 5,000 Rs"}
                      {!["car", "van", "bike"].includes(
                        rent.vehicleType?.toLowerCase()
                      ) && "Rate unavailable"}
                    </td>
                  </tr>
                  <tr>
                    <td>Rental Duration</td>
                    <td>
                      {calculateDuration(rent.pickUpDate, rent.dropOffDate)}{" "}
                      days
                    </td>
                  </tr>
                  <tr className="price-row">
                    <td>Total Price</td>
                    <td>
                      {calculateTotalPrice(
                        rent.vehicleType,
                        rent.pickUpDate,
                        rent.dropOffDate
                      ).toLocaleString()}{" "}
                      Rs
                    </td>
                  </tr>
                </tbody>
              </table>

              <div className="button-container">
                <button
                  className="update-button"
                  onClick={() => navigate(`/editRents/${rent._id}`)}
                >
                  📝 Update Order
                </button>

                <button
                  className="delete-button"
                  onClick={() => handleDelete(rent._id)}
                >
                  🗑️ Cancel Booking
                </button>
                <button
                  className="btn-generate-report"
                  onClick={() => navigate("/rent-report")}
                >
                  Generate Report
                </button>
              </div>
            </div>
          ))
        )}
      </div>
      <Footer />
    </div>
  );
};

export default ViewRentDetails;

// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import "../stylesheets/viewRent.css";
// import Header from "./header";
// import Footer from "./footer";
// import { useAuth } from "../context/AuthContext";

// const ViewRentDetails = () => {
//   const { user } = useAuth();
//   const [rentDetails, setRents] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const getRentDetails = async () => {
//       if (!user?.email) return;

//       setIsLoading(true);
//       try {
//         const res = await axios.get("http://localhost:8000/rent");
//         const allRents = res.data.existingRents || [];
//         const userRents = allRents.filter(
//           (rent) => rent.userEmail === user.email
//         );
//         setRents(userRents);
//         console.log("Filtered rents for:", user.email);
//       } catch (err) {
//         if (err.response) {
//           console.log(err.response.data.error);
//         } else {
//           console.log("Error occurred while processing your get request");
//         }
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     getRentDetails();
//   }, [user]);

//   const calculateTotalPrice = (vehicleType, pickUpDate, dropOffDate) => {
//     const dailyRates = {
//       car: 10000,
//       van: 17000,
//       bike: 5000,
//     };
//     const startDate = new Date(pickUpDate);
//     const endDate = new Date(dropOffDate);
//     const diffTime = Math.abs(endDate - startDate);
//     const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) || 1;
//     const dailyRate = dailyRates[vehicleType.toLowerCase()] || 0;
//     return dailyRate * diffDays;
//   };

//   const calculateDuration = (pickUpDate, dropOffDate) => {
//     const startDate = new Date(pickUpDate);
//     const endDate = new Date(dropOffDate);
//     const diffTime = Math.abs(endDate - startDate);
//     return Math.ceil(diffTime / (1000 * 60 * 60 * 24)) || 1;
//   };

//   const formatDate = (dateString) => {
//     const options = { year: "numeric", month: "long", day: "numeric" };
//     return new Date(dateString).toLocaleDateString(undefined, options);
//   };

//   const handleDelete = async (id) => {
//     try {
//       const confirmed = window.confirm(
//         "Are you sure you want to cancel this booking?"
//       );
//       if (confirmed) {
//         await axios.delete(`http://localhost:8000/rent/delete/${id}`);
//         setRents(rentDetails.filter((rent) => rent._id !== id));
//         alert("Booking cancelled successfully.");
//       } else {
//         alert("Deletion cancelled!");
//       }
//     } catch (err) {
//       console.log("handleDelete function failed! ERROR: " + err.message);
//     }
//   };

//   if (isLoading) {
//     return (
//       <div className="rent-container">
//         <h1 className="page-title">Loading Booking Details...</h1>
//       </div>
//     );
//   }

//   return (
//     <div>
//       <Header />
//       <button className="btn-home">
//         <a href="/carDashboard" className="back-link">
//           Home
//         </a>
//       </button>
//       <div className="rent-container">
//         <h1 className="page-title">View Booking Details</h1>

//         {rentDetails.length === 0 ? (
//           <div className="rent-card">
//             <p style={{ textAlign: "center", padding: "20px" }}>
//               No bookings found. Create a new booking to get started.
//             </p>
//           </div>
//         ) : (
//           rentDetails.map((rent, index) => (
//             <div key={index} className="rent-card">
//               <div className="card-header">
//                 <h3>Rental Details</h3>
//                 <span className="order-id-badge">
//                   Order ID: {rent.carOrderid || "N/A"}
//                 </span>
//               </div>

//               <div className="customer-section">
//                 <div className="customer-info">
//                   <h4>Customer Information</h4>
//                   <div className="info-item">
//                     <div className="info-label">Full Name</div>
//                     <div className="info-value">
//                       {rent.nameOfRenter || "Not provided"}
//                     </div>
//                   </div>
//                   <div className="info-item">
//                     <div className="info-label">Contact Number</div>
//                     <div className="info-value">
//                       {rent.telNo || "Not provided"}
//                     </div>
//                   </div>
//                 </div>

//                 <div className="customer-info">
//                   <h4>Location Information</h4>
//                   <div className="info-item">
//                     <div className="info-label">Country</div>
//                     <div className="info-value">
//                       {rent.country || "Not provided"}
//                     </div>
//                   </div>
//                   <div className="info-item">
//                     <div className="info-label">City</div>
//                     <div className="info-value">
//                       {rent.city || "Not provided"}
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               <div className="travel-section">
//                 <h4>Travel Details</h4>
//                 <div className="travel-info">
//                   <div className="travel-detail">
//                     <div className="travel-icon">🚗</div>
//                     <div className="travel-content">
//                       <div className="travel-label">Vehicle Type</div>
//                       <div className="travel-value">
//                         {rent.vehicleType || "Not specified"}
//                       </div>
//                     </div>
//                   </div>

//                   <div className="travel-detail">
//                     <div className="travel-icon">⏱️</div>
//                     <div className="travel-content">
//                       <div className="travel-label">Duration</div>
//                       <div className="travel-value">
//                         {calculateDuration(rent.pickUpDate, rent.dropOffDate)}{" "}
//                         days
//                       </div>
//                     </div>
//                   </div>

//                   <div className="travel-detail">
//                     <div className="travel-icon">📍</div>
//                     <div className="travel-content">
//                       <div className="travel-label">Pick Up Location</div>
//                       <div className="travel-value">
//                         {rent.pickUpLocation || "Not specified"}
//                       </div>
//                     </div>
//                   </div>

//                   <div className="travel-detail">
//                     <div className="travel-icon">📆</div>
//                     <div className="travel-content">
//                       <div className="travel-label">Pick Up Date</div>
//                       <div className="travel-value">
//                         {formatDate(rent.pickUpDate)}
//                       </div>
//                     </div>
//                   </div>

//                   <div className="travel-detail">
//                     <div className="travel-icon">🏁</div>
//                     <div className="travel-content">
//                       <div className="travel-label">Drop Off Location</div>
//                       <div className="travel-value">
//                         {rent.dropOffLocation || "Not specified"}
//                       </div>
//                     </div>
//                   </div>

//                   <div className="travel-detail">
//                     <div className="travel-icon">📅</div>
//                     <div className="travel-content">
//                       <div className="travel-label">Drop Off Date</div>
//                       <div className="travel-value">
//                         {formatDate(rent.dropOffDate)}
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               <table className="rent-details-table">
//                 <tbody>
//                   <tr>
//                     <td>Vehicle Daily Rate</td>
//                     <td>
//                       {rent.vehicleType?.toLowerCase() === "car" &&
//                         "Rs 10,000"}
//                       {rent.vehicleType?.toLowerCase() === "van" &&
//                         "Rs 17,000"}
//                       {rent.vehicleType?.toLowerCase() === "bike" &&
//                         "Rs 5,000"}
//                       {!["car", "van", "bike"].includes(
//                         rent.vehicleType?.toLowerCase()
//                       ) && "Rate unavailable"}
//                     </td>
//                   </tr>
//                   <tr>
//                     <td>Rental Duration</td>
//                     <td>
//                       {calculateDuration(rent.pickUpDate, rent.dropOffDate)}{" "}
//                       days
//                     </td>
//                   </tr>
//                   <tr className="price-row">
//                     <td>Total Price</td>
//                     <td>
//                       {calculateTotalPrice(
//                         rent.vehicleType,
//                         rent.pickUpDate,
//                         rent.dropOffDate
//                       ).toLocaleString()}{" "}
//                       Rs
//                     </td>
//                   </tr>
//                 </tbody>
//               </table>

//               <div className="button-container">
//                 <button
//                   className="update-button"
//                   onClick={() => navigate(`/editRents/${rent._id}`)}
//                 >
//                   📝 Update Order
//                 </button>

//                 <button
//                   className="delete-button"
//                   onClick={() => handleDelete(rent._id)}
//                 >
//                   🗑️ Cancel Booking
//                 </button>

//                 <button
//                   className="btn-generate-report"
//                   onClick={() => navigate("/rent-report")}
//                 >
//                   Generate Report
//                 </button>
//               </div>
//             </div>
//           ))
//         )}
//       </div>
//       <Footer />
//     </div>
//   );
// };

// export default ViewRentDetails;