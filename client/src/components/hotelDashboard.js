import { useNavigate } from "react-router-dom";
import { useState } from "react";

// Sample hotel data with real image URLs
const hotels = [
    {
        id: 1,
        name: "Grand Luxury Hotel",
        location: "New York, USA",
        price: 200,
        rating: 4.8,
        reviews: 325,
        description: "Experience luxury in the heart of Manhattan with stunning city views.",
        amenities: ["Free WiFi", "Pool", "Spa", "Fitness Center"],
        image: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.booking.com%2Fhotel%2Flk%2Fsigiriya.html&psig=AOvVaw0k5xBR43U3kLWeTIs4iiU2&ust=1743397347665000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCIDKy6-DsYwDFQAAAAAdAAAAABAE"
    },
    {
        id: 2,
        name: "Ocean View Resort",
        location: "Maldives",
        price: 350,
        rating: 4.9,
        reviews: 412,
        description: "Pristine beaches and overwater bungalows for the ultimate tropical getaway.",
        amenities: ["Private Beach", "Diving", "Restaurant", "Airport Shuttle"],
        image: "https://source.unsplash.com/400x300/?beach,resort"
    },
    {
        id: 3,
        name: "Mountain Escape Lodge",
        location: "Switzerland",
        price: 250,
        rating: 4.7,
        reviews: 286,
        description: "Cozy alpine retreat with breathtaking mountain views and ski-in access.",
        amenities: ["Fireplace", "Sauna", "Ski Storage", "Restaurant"],
        image: "https://source.unsplash.com/400x300/?mountain,lodge"
    }
];

export default function HotelBookingDashboard() {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState("");
    const [priceFilter, setPriceFilter] = useState("all");

    // Filter hotels based on search input and price range
    const filteredHotels = hotels.filter(hotel => {
        const matchesSearch = hotel.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                             hotel.location.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesPrice = priceFilter === "all" || 
                            (priceFilter === "budget" && hotel.price < 200) ||
                            (priceFilter === "mid" && hotel.price >= 200 && hotel.price < 300) ||
                            (priceFilter === "luxury" && hotel.price >= 300);

        return matchesSearch && matchesPrice;
    });

    return (
        <div className="dashboard-container">
            <h1 className="title">Find Your Perfect Stay</h1>

            <div className="search-filter">
                <input
                    type="text"
                    placeholder="Search hotels or destinations..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="search-box"
                />
                <select 
                    className="filter-dropdown"
                    value={priceFilter}
                    onChange={(e) => setPriceFilter(e.target.value)}
                >
                    <option value="all">All Prices</option>
                    <option value="budget">Budget (Under $200)</option>
                    <option value="mid">Mid-Range ($200-$300)</option>
                    <option value="luxury">Luxury ($300+)</option>
                </select>
            </div>

            {filteredHotels.length === 0 ? (
                <p className="no-results">No hotels found. Try adjusting your filters.</p>
            ) : (
                <div className="hotel-list">
                    {filteredHotels.map((hotel) => (
                        <div key={hotel.id} className="hotel-card">
                            <img src={hotel.image} alt={hotel.name} className="hotel-image" />
                            <div className="hotel-details">
                                <h2>{hotel.name}</h2>
                                <p className="location">{hotel.location}</p>
                                <p>{hotel.description}</p>
                                <div className="amenities">
                                    {hotel.amenities.map((amenity, index) => (
                                        <span key={index} className="amenity-tag">{amenity}</span>
                                    ))}
                                </div>
                                <div className="hotel-footer">
                                    <span className="hotel-price">${hotel.price}/night</span>
                                    <button 
                                        className="book-button"
                                        onClick={() => navigate(`/createHotel/${hotel.id}`)}
                                    >
                                        Book Now
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
