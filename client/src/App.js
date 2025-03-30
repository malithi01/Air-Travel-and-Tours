import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import dashboard from "./components/dashboard";
import rentDetails from "./components/rentDetails";
import createRents from "./components/createRents";
import editRents from "./components/editRents";
import bookingDetails from "./components/bookingDetails";
import viewHotel from "./components/viewHotel";
import ratingAndReviewDetails from "./components/ratingAndReviewDetails";
import CreateHotel from "./components/createHotel";
import EditHotel from "./components/editHotel";
import CreateBookings from "./components/createBookingDetails";
import createRatingAndReview from "./components/createRatingAndReview";
import hotelDashboard from "./components/hotelDashboard";
        


function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/dashboard" Component={dashboard} />
          <Route path="/rentDetails" Component={rentDetails} />
          <Route path="/createRents" Component={createRents} />
          <Route path="/editRents/:id" Component={editRents} />
          <Route path="/bookingDetails" Component={bookingDetails} />
          <Route path="/viewHotel" Component={viewHotel} />
          <Route path="/ratingAndReviewDetails" Component={ratingAndReviewDetails} />
          <Route path="/createHotel" Component={CreateHotel}/>
          <Route path="/editHotel/:id" Component={EditHotel}/>
          <Route path="/bookings/details" Component={bookingDetails} />
          <Route path="/viewHotel" Component={viewHotel}/>
          <Route path="/ratingAndReviewDetails" Component={ratingAndReviewDetails} />
          <Route path="/bookings/create" Component={CreateBookings} />
          <Route path="/createRatingAndReview" Component={createRatingAndReview} />
          <Route path="/hotelDashboard" Component={hotelDashboard}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;