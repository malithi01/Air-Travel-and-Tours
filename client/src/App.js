import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useNavigate,
} from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";

// Import your existing components - with correct PascalCase naming
import Dashboard from "./components/dashboard";
import RentDetails from "./components/rentDetails";
import CreateRents from "./components/createRents";
import EditRents from "./components/editRents";
import BookingDetails from "./components/bookingDetails";
import ViewHotel from "./components/viewHotel";
import RatingAndReviewDetails from "./components/ratingAndReviewDetails";
import CarDashboard from "./components/carDashboard";
import CreateHotel from "./components/createHotel";
import EditHotel from "./components/editHotel";
import CreateBookings from "./components/createBookingDetails";
import CreateRatingAndReview from "./components/createRatingAndReview";
import PackingForm from "./components/packingForm";
import LoginPage from "./components/loginPage";
import RentReportGenerate from "./components/rentReportGenerate"; 
import Register from "./components/registerPage";

// Protected route component to secure routes
const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading...</p>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

import editBookings from "./components/editBookingDetails";
import flightBookingDashboard from "./components/flightBookingDashboard";
import createRatingAndReview from "./components/createRatingAndReview";
import hotelDashboard from "./components/hotelDashboard";
import editRatingAndReviews from "./components/editRatingAndReviews";

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="App">
          <Routes>
            {/* Public route - Login */}
            <Route path="/login" element={<LoginPage />} />

            {/* Protected routes - Using correct component references */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />

            <Route
              path="/rentDetails"
              element={
                <ProtectedRoute>
                  <RentDetails />
                </ProtectedRoute>
              }
            />

            <Route
              path="/createRents"
              element={
                <ProtectedRoute>
                  <CreateRents />
                </ProtectedRoute>
              }
            />

            <Route
              path="/editRents/:id"
              element={
                <ProtectedRoute>
                  <EditRents />
                </ProtectedRoute>
              }
            />

            <Route
              path="/bookingDetails"
              element={
                <ProtectedRoute>
                  <BookingDetails />
                </ProtectedRoute>
              }
            />

            <Route
              path="/viewHotel"
              element={
                <ProtectedRoute>
                  <ViewHotel />
                </ProtectedRoute>
              }
            />

            <Route
              path="/ratingAndReviewDetails"
              element={
                <ProtectedRoute>
                  <RatingAndReviewDetails />
                </ProtectedRoute>
              }
            />

            <Route
              path="/createHotel"
              element={
                <ProtectedRoute>
                  <CreateHotel />
                </ProtectedRoute>
              }
            />

            <Route
              path="/editHotel"
              element={
                <ProtectedRoute>
                  <EditHotel />
                </ProtectedRoute>
              }
            />

            <Route
              path="/bookings/details"
              element={
                <ProtectedRoute>
                  <BookingDetails />
                </ProtectedRoute>
              }
            />

            <Route
              path="/carDashboard"
              element={
                <ProtectedRoute>
                  <CarDashboard />
                </ProtectedRoute>
              }
            />

            <Route
              path="/bookings/create"
              element={
                <ProtectedRoute>
                  <CreateBookings />
                </ProtectedRoute>
              }
            />

            <Route
              path="/createRatingAndReview"
              element={
                <ProtectedRoute>
                  <CreateRatingAndReview />
                </ProtectedRoute>
              }
            />

            <Route
              path="/packingForm"
              element={
                <ProtectedRoute>
                  <PackingForm />
                </ProtectedRoute>
              }
            />

            <Route
              path="/rent-report"
              element={
                <ProtectedRoute>
                  <RentReportGenerate />
                </ProtectedRoute>
              }
            />

            <Route
              path="/register"
              element={
                <ProtectedRoute>
                  <Register />
                </ProtectedRoute>
              }
            />

            {/* Redirect root path to dashboard */}
            <Route path="/" element={<Navigate to="/login" replace />} />

            {/* Catch-all route for 404 */}
            {/* <Route
              path="*"
              element={
                <div className="not-found">
                  <h1>404 - Page Not Found</h1>
                  <p>The page you're looking for doesn't exist.</p>
                  <button onClick={() => (window.location.href = "/dashboard")}>
                    Go to Dashboard
                  </button>
                </div>
              }
            /> */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </AuthProvider>
      <div className="App">
        <Routes>
          <Route path="/dashboard" Component={dashboard} />
          <Route path="/rentDetails" Component={rentDetails} />
          <Route path="/createRents" Component={createRents} />
          <Route path="/editRents/:id" Component={editRents} />
          <Route path="/bookingDetails" Component={bookingDetails} />
          <Route path="/viewHotel" Component={viewHotel} />
          <Route
            path="/ratingAndReviewDetails"
            Component={ratingAndReviewDetails}
          />
          <Route path="/createHotel" Component={CreateHotel} />
          <Route path="/editHotel/:id" Component={EditHotel} />
          <Route path="/bookings/details" Component={bookingDetails} />
          <Route path="/viewHotel" Component={viewHotel} />
          <Route
            path="/ratingAndReviewDetails"
            Component={ratingAndReviewDetails}
          />
          <Route path="/bookings/create" Component={CreateBookings} />
          <Route
            path="/createRatingAndReview"
            Component={createRatingAndReview}
          />
          <Route path="/viewHotel" Component={viewHotel} />
          <Route
            path="/ratingAndReviewDetails"
            Component={ratingAndReviewDetails}
          />
          <Route path="/carDashboard" Component={carDashboard} />
          <Route path="/bookings/create" Component={CreateBookings} />
          <Route
            path="/createRatingAndReview"
            Component={createRatingAndReview}
          />
          <Route path="/hotelDashboard" Component={hotelDashboard} />
          <Route
            path="/editRatingAndReviews/:id"
            Component={editRatingAndReviews}
          />
          <Route path="/editBookingDetails/:id" Component={editBookings} />
          <Route path="/flightDashboard" Component={flightBookingDashboard} />
        </Routes>
      </div>
    </Router>
  );
}

function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="not-found">
      <h1>404 - Page Not Found</h1>
      <p>The page you're looking for doesn't exist.</p>
      <button onClick={() => navigate("/dashboard")}>Go to Dashboard</button>
    </div>
  );
}

export default App;
