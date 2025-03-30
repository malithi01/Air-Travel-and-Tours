import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import dashboard from "./components/dashboard";
import rentDetails from "./components/rentDetails";
import createRents from "./components/createRents";
import editRents from "./components/editRents";
import bookingDetails from "./components/bookingDetails";
import viewHotel from "./components/viewHotel";
import ratingAndReviewDetails from "./components/ratingAndReviewDetails";
import CreateBookings from "./components/createBookingDetails";
import editBookings from "./components/editBookingDetails";
import flightBookingDashboard from "./components/flightBookingDashboard";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/dashboard" Component={dashboard} />
          <Route path="/rentDetails" Component={rentDetails} />
          <Route path="/createRents" Component={createRents} />
          <Route path="/editRents/:id" Component={editRents} />
          <Route path="/bookings/details" Component={bookingDetails} />
          <Route path="/viewHotel" Component={viewHotel} />
          <Route
            path="/ratingAndReviewDetails"
            Component={ratingAndReviewDetails}
          />
          <Route path="/createBooking" Component={CreateBookings} />
          <Route path="/editBookingDetails/:id" Component={editBookings} />
          <Route path="/flightDashboard" Component={flightBookingDashboard} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
