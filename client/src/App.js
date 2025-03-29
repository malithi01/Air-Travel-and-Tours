import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import dashboard from "./components/dashboard";
import rentDetails from "./components/rentDetails";
import createRents from "./components/createRents";
import editRents from "./components/editRents";
import bookingDetails from "./components/bookingDetails";
import viewHotel from "./components/viewHotel";
import ratingAndReviewDetails from "./components/ratingAndReviewDetails";
import createRatingAndReview from "./components/createRatingAndReview";
        


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
          <Route path="/viewHotel" Component={viewHotel}/>
          <Route path="/ratingAndReviewDetails" Component={ratingAndReviewDetails} />
          <Route path="/createRatingAndReview" Component={createRatingAndReview} />

        </Routes>
      </div>
    </Router>
  );
}

export default App;