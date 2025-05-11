// import React, { Component } from "react";
// import "./../stylesheets/carDashboard.css";

// export default class header extends Component {
//   render() {
//     return (
//       <div>
//         <div className="header" style={{margin:"none"}}>
//           <div>
//             <ul className="navbar">
//               <div
//                 className="rDetails"
//                 style={{ marginRight: "150px", marginLeft: "50px" }}
//               >
//                 <li style={{ alignItems: "center" }}>
//                   <a class="active" href="">
//                     Flight Booking
//                   </a>
//                 </li>
//               </div>
//               <div
//                 className="rDetails"
//                 style={{ marginRight: "50px", marginLeft: "0px" }}
//               >
//                 <li>
//                   <a class="active" href="/viewProduct">
//                     Hotel Booking
//                   </a>
//                 </li>
//               </div>

//               <div
//                 className="rDetails"
//                 style={{  marginRight: "50px", marginLeft: "50px" }}
//               >
//                 <li>
//                   <a href="/carDashboard">Car Rental</a>
//                 </li>
//               </div>
//               {/* <div className="logo" style={{ margin: "0 auto" }}>
//                 <a href="/dashboard">
//                   <img src="./images/logo.png" className="image"></img>
//                   </a>
//                 </div> */}
                
//               <div
//                 className="rDetails"
//                 style={{  marginRight: "50px", marginLeft: "50px" }}
//               >
//                 <li>
//                   <a href="/viewProductCnt">Reviews and Ratings</a>
//                 </li>
//               </div>
//               <div
//                 className="pDetails"
//                 style={{ marginRight: "50px", marginLeft: "200px" }}
//               >
//                 <li>
//                   <a href="/packingForm">Packing assistant</a>
//                 </li>
//               </div>
//             </ul>
//           </div>
//         </div>
//         <br></br>
//       </div>
//     );
//   }
// }


// import React from "react";
// import { useAuth } from "../context/AuthContext";
// import "./../stylesheets/carDashboard.css";
// import { useNavigate } from "react-router-dom";

// export default function Header() {
//   const { user, logout, isAuthenticated } = useAuth();
//   const navigate = useNavigate();

// const handleLogout = () => {
//   console.log('Logout clicked');
//   logout();              // clear user from context
//   navigate("/login");    // redirect to login page
// };


//   return (
//     <div>
//       <div className="header" style={{ margin: "none" }}>
//         <ul className="navbar">
//           {/* ... other nav items ... */}

//           <div className="rDetails" style={{ marginRight: "20px", marginLeft: "auto" }}>
//             {isAuthenticated ? (
//               <>
//                 <li style={{ marginRight: "10px" }}>
//                   <span style={{ color: "#fff" }}>Welcome, {user.name || user.email}</span>
//                 </li>
//                 <li>
//                   <button onClick={logout} className="logout-btn">
//                     Logout
//                   </button>
//                 </li>
//               </>
//             ) : (
//               <li>
//                 <a href="/login">Login</a>
//               </li>
//             )}
//           </div>
//         </ul>
//       </div>
//       <br />
//     </div>
//   );
// }

// import React from "react";
// import { useNavigate, Link } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";
// import "./../stylesheets/carDashboard.css";

// const Header = () => {
//   const { user, logout, isAuthenticated } = useAuth();
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     console.log('Logout clicked');
//     logout();              // clear user from context
//     navigate("/login");    // redirect to login page
//   };

//   return (
//     <div>
//       <div className="header">
//         <ul className="navbar">
//           {/* Navigation Links */}
//           <div className="rDetails" style={{ marginRight: "30px", marginLeft: "20px" }}>
//             <li>
//               <Link to="/" className="nav-link active">
//                 Flight Booking
//               </Link>
//             </li>
//           </div>
          
//           <div className="rDetails" style={{ marginRight: "30px" }}>
//             <li>
//               <Link to="/viewProduct" className="nav-link">
//                 Hotel Booking
//               </Link>
//             </li>
//           </div>

//           <div className="rDetails" style={{ marginRight: "30px" }}>
//             <li>
//               <Link to="/carDashboard" className="nav-link">
//                 Car Rental
//               </Link>
//             </li>
//           </div>

//           <div className="rDetails" style={{ marginRight: "30px" }}>
//             <li>
//               <Link to="/viewProductCnt" className="nav-link">
//                 Reviews and Ratings
//               </Link>
//             </li>
//           </div>
          
//           <div className="rDetails" style={{ marginRight: "30px" }}>
//             <li>
//               <Link to="/packingForm" className="nav-link">
//                 Packing Assistant
//               </Link>
//             </li>
//           </div>

//           {/* User authentication section - pushed to the right */}
//           <div className="rDetails" style={{ marginLeft: "auto", marginRight: "20px", display: "flex", alignItems: "center" }}>
//             {isAuthenticated ? (
//               <>
//                 <li style={{ marginRight: "15px" }}>
//                   <span style={{ color: "#fff" }}>Welcome, {user?.name || user?.email || "User"}</span>
//                 </li>
//                 <li>
//                   <button onClick={handleLogout} className="logout-btn">
//                     Logout
//                   </button>
//                 </li>
//               </>
//             ) : (
//               <li>
//                 <Link to="/login" className="login-link">
//                   Login
//                 </Link>
//               </li>
//             )}
//           </div>
//         </ul>
//       </div>
//     </div>
//   );
// };

// export default Header;

import React from "react";
import { useNavigate, Link } from "react-router-dom"; // Ensure these are imported
import { useAuth } from "../context/AuthContext"; // Make sure the path is correct
import "./../stylesheets/carDashboard.css";

const Header = () => {
  const { user, logout, isAuthenticated } = useAuth();  // Use the context for auth state
  const navigate = useNavigate();  // For navigation

  const handleLogout = () => {
    console.log('Logout clicked');
    logout();              // Clear user from context
    navigate("/login");    // Redirect to login page
  };

  return (
    <div>
      <div className="header">
        <ul className="navbar">
          {/* Navigation Links */}
          <div className="rDetails" style={{ marginRight: "30px", marginLeft: "20px" }}>
            <li>
              <Link to="/" className="nav-link active">
                Flight Booking
              </Link>
            </li>
          </div>

          <div className="rDetails" style={{ marginRight: "30px" }}>
            <li>
              <Link to="/viewProduct" className="nav-link">
                Hotel Booking
              </Link>
            </li>
          </div>

          <div className="rDetails" style={{ marginRight: "30px" }}>
            <li>
              <Link to="/carDashboard" className="nav-link">
                Car Rental
              </Link>
            </li>
          </div>

          <div className="rDetails" style={{ marginRight: "30px" }}>
            <li>
              <Link to="/viewProductCnt" className="nav-link">
                Reviews and Ratings
              </Link>
            </li>
          </div>

          <div className="rDetails" style={{ marginRight: "30px" }}>
            <li>
              <Link to="/packingForm" className="nav-link">
                Packing Assistant
              </Link>
            </li>
          </div>

          {/* User authentication section - pushed to the right */}
          <div className="rDetails" style={{ marginLeft: "auto", marginRight: "20px", display: "flex", alignItems: "center" }}>
            {isAuthenticated ? (
              <>
                <li style={{ marginRight: "15px" }}>
                  <span style={{ color: "#fff" }}>Welcome, {user?.name || user?.email || "User"}</span>

export default class header extends Component {
  render() {
    return (
      <div>
        <div className="header" style={{ margin: "none" }}>
          <div>
            <ul className="navbar">
              <div
                className="rDetails"
                style={{ marginRight: "150px", marginLeft: "50px" }}
              >
                <li style={{ alignItems: "center" }}>
                  <a class="active" href="flightDashboard">
                    Flight Booking
                  </a>
                </li>
              </div>
              <div
                className="rDetails"
                style={{ marginRight: "50px", marginLeft: "0px" }}
              >
                <li>
                  <a class="active" href="/hotelDashboard">
                    Hotel Booking
                  </a>
                </li>
              </div>

              <div
                className="rDetails"
                style={{ marginRight: "50px", marginLeft: "50px" }}
              >
                <li>
                  <a href="/carDashboard">Car Rental</a>
                </li>
              </div>
              {/* <div className="logo" style={{ margin: "0 auto" }}>
                <a href="/dashboard">
                  <img src="./images/logo.png" className="image"></img>
                  </a>
                </div> */}

              <div
                className="rDetails"
                style={{ marginRight: "50px", marginLeft: "50px" }}
              >
                <li>
                  <a href="/ratingAndReviewsDashboard">Reviews and Ratings</a>
                  <a href="/ratingsAndReviewsDashboard">Reviews and Ratings</a>

                </li>
                <li>
                  <button onClick={handleLogout} className="logout-btn">
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <li>
                <Link to="/login" className="login-link">
                  Login
                </Link>
              </li>
            )}
          </div>
        </ul>
      </div>
    </div>
  );
};

export default Header;  // Export the component to make it available in other files
