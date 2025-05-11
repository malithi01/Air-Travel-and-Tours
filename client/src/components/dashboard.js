import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./../stylesheets/mainDashboard.css";
import Header from "./header";
import Footer from "./footer";

export default class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentSlide: 0,
      slides: [
        {
          id: 1,
          image: "./images/slide2.jpg",
          title: "Premium Flight Experience",
          subtitle: "Travel in comfort with our partner airlines",
        },
        {
          id: 2,
          image: "./images/slide3.jpg",
          title: "Luxurious Stays",
          subtitle: "Handpicked hotels for an unforgettable experience",
        },
        {
          id: 3,
          image: "./images/slide1.avif",
          title: "Easy Vehical Renting",
          subtitle: "Find easy transport to roam freely throughout your travel",
          link: "/carDashboard",
        },
      ],
      featuredDestinations: [
        {
          id: 1,
          name: "Bali, Indonesia",
          image: "./images/bali.webp",
          price: "Rs. 150,000.00",
          rating: 4.8,
        },
        {
          id: 2,
          name: "Paris, France",
          image: "./images/paris.jpg",
          price: "Rs. 180,000.00",
          rating: 4.9,
        },
        {
          id: 3,
          name: "Santorini, Greece",
          image: "./images/greece.jpeg",
          price: "Rs. 200,000.00",
          rating: 4.7,
        },
        // {
        //   id: 4,
        //   name: "Tokyo, Japan",
        //   image: "./images/tokyo.jpg",
        //   price: "Rs. 220,000.00",
        //   rating: 4.6
        // }
      ],
    };
  }

  componentDidMount() {
    this.slideInterval = setInterval(() => {
      this.setState((prevState) => ({
        currentSlide: (prevState.currentSlide + 1) % this.state.slides.length,
      }));
    }, 5000);
  }

  componentWillUnmount() {
    clearInterval(this.slideInterval);
  }

  setCurrentSlide = (index) => {
    this.setState({
      currentSlide: index,
    });
  };

  renderRatingStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<i key={`star-${i}`} className="fas fa-star"></i>);
    }

    if (hasHalfStar) {
      stars.push(<i key="half-star" className="fas fa-star-half-alt"></i>);
    }

    const emptyStars = 5 - stars.length;
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<i key={`empty-star-${i}`} className="far fa-star"></i>);
    }

    return stars;
  };

  render() {
    const { currentSlide, slides, featuredDestinations } = this.state;

    return (
      <div className="dashboard-wrapper">
        <Header />

        {/* Hero Slideshow */}
        <div className="hero-slideshow">
          {slides.map((slide, index) => (
            <div
              key={slide.id}
              className={`slide ${index === currentSlide ? "active" : ""}`}
              style={{ backgroundImage: `url(${slide.image})` }}
            >
              <div className="slide-content">
                <h1>{slide.title}</h1>
                <p>{slide.subtitle}</p>
                <Link to={slide.link || "#"} className="cta-button">
                  Explore Now
                </Link>
              </div>
            </div>
          ))}

          <div className="slide-indicators">
            {slides.map((slide, index) => (
              <button
                key={slide.id}
                className={`slide-indicator ${
                  index === currentSlide ? "active" : ""
                }`}
                onClick={() => this.setCurrentSlide(index)}
              />
            ))}
          </div>
        </div>

        {/* Services Section */}
        <div className="services-section">
          <h2 className="section-title">Our Services</h2>
          <div className="services-container">
            <Link to="/flightDashboard" className="service-card flight">
              <div className="service-icon">
                <i className="fas fa-plane"></i>
              </div>
              <h3>Flight Booking</h3>
              <p>
                Find the best flight deals with exclusive discounts on domestic
                and international flights.
              </p>
              <button className="service-button">Book Flights</button>
            </Link>

            <Link to="/hotelDashboard" className="service-card hotel">
              <div className="service-icon">
                <i className="fas fa-hotel"></i>
              </div>
              <h3>Hotel Booking</h3>
              <p>
                From luxury stays to budget-friendly options, find the perfect
                accommodation for your trip.
              </p>
              <button className="service-button">Book Hotels</button>
            </Link>

            <Link to="/carDashboard" className="service-card car">
              <div className="service-icon">
                <i className="fas fa-car"></i>
              </div>
              <h3>Car Rental</h3>
              <p>
                Drive your way with comfortable, affordable and reliable car
                rentals at your destination.
              </p>
              <button className="service-button">Rent a Car</button>
            </Link>

            {/* <Link to="/tourDashboard" className="service-card tour">
              <div className="service-icon">
                <i className="fas fa-map-marked-alt"></i>
              </div>
              <h3>Tour Packages</h3>
              <p>Explore handcrafted tour packages with guided tours, activities, and unforgettable experiences.</p>
              <button className="service-button">View Packages</button>
            </Link> */}
          </div>
        </div>

        {/* Featured Destinations */}
        <div className="featured-section">
          <h2 className="section-title">Featured Destinations</h2>
          <div className="destinations-container">
            {featuredDestinations.map((destination) => (
              <div key={destination.id} className="destination-card">
                <div className="destination-image-container">
                  <img
                    src={destination.image}
                    alt={destination.name}
                    className="destination-image"
                  />
                </div>
                <div className="destination-info">
                  <h3 className="destination-name">{destination.name}</h3>
                  <div className="destination-rating">
                    {this.renderRatingStars(destination.rating)}
                    <span className="rating-value">{destination.rating}</span>
                  </div>
                  <p className="destination-price">
                    Starting from {destination.price}
                  </p>
                  <button className="view-details-button">View Details</button>
                </div>
              </div>
            ))}
          </div>
          <div className="view-all-container">
            {/* <Link to="/allDestinations" className="view-all-link">
              View All Destinations <i className="fas fa-arrow-right"></i>
            </Link> */}
          </div>
        </div>

        {/* Customer Reviews */}
        <div className="reviews-section">
          <h2 className="section-title">What Our Customers Say</h2>
          <div className="reviews-container">
            <div className="review-card">
              <div className="review-header">
                <img
                  src="./images/customer2.jpg"
                  alt="Customer"
                  className="reviewer-image"
                />
                <div className="reviewer-info">
                  <h4>Sarah Johnson</h4>
                  <div className="review-rating">
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                  </div>
                </div>
              </div>
              <p className="review-text">
                "Our family trip to Bali was absolutely perfect! The flight and
                hotel bookings were seamless, and the tour packages offered were
                exceptional. Will definitely book again!"
              </p>
            </div>

            <div className="review-card">
              <div className="review-header">
                <img
                  src="./images/customer1.jpeg"
                  alt="Customer"
                  className="reviewer-image"
                />
                <div className="reviewer-info">
                  <h4>Michael Chen</h4>
                  <div className="review-rating">
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star-half-alt"></i>
                  </div>
                </div>
              </div>
              <p className="review-text">
                "The car rental service was exceptional! The vehicle was clean,
                well-maintained and the pickup process was quick. The customer
                service team was very helpful."
              </p>
            </div>

            <div className="review-card">
              <div className="review-header">
                <img
                  src="./images/customer3.jpg"
                  alt="Customer"
                  className="reviewer-image"
                />
                <div className="reviewer-info">
                  <h4>Emma Rodriguez</h4>
                  <div className="review-rating">
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                  </div>
                </div>
              </div>
              <p className="review-text">
                "The European tour package was beyond my expectations! The
                hotels were luxurious, the guided tours were informative, and
                the overall experience was unforgettable."
              </p>
            </div>
          </div>
          <div className="view-all-container">
            <Link to="/ratingAndReviewsDashboard" className="view-all-link">
              View All Reviews <i className="fas fa-arrow-right"></i>
            </Link>
          </div>
        </div>

        {/* Special Offers */}
        {/* <div className="offers-section">
          <h2 className="section-title">Special Offers</h2>
          <div className="offers-container">
            <div className="offer-card">
              <div className="offer-badge">20% OFF</div>
              <div className="offer-content">
                <h3>Summer Escape Package</h3>
                <p>Book a flight + hotel combo and save up to 20% on your next summer vacation.</p>
                <button className="offer-button">View Offer</button>
              </div>
            </div>
            
            <div className="offer-card">
              <div className="offer-badge">FREE</div>
              <div className="offer-content">
                <h3>Child Stays Free</h3>
                <p>Children under 12 stay free when sharing a room with parents at select hotels.</p>
                <button className="offer-button">View Offer</button>
              </div>
            </div>
            
            <div className="offer-card">
              <div className="offer-badge">30% OFF</div>
              <div className="offer-content">
                <h3>Last Minute Deals</h3>
                <p>Save big on last-minute bookings for flights, hotels, and tour packages.</p>
                <button className="offer-button">View Offer</button>
              </div>
            </div>
          </div>
        </div> */}

        {/* Newsletter */}
        {/* <div className="newsletter-section">
          <div className="newsletter-content">
            <h2>Subscribe to Our Newsletter</h2>
            <p>Get exclusive deals, travel tips, and updates delivered to your inbox.</p>
            <div className="newsletter-form">
              <input type="email" placeholder="Your Email Address" className="newsletter-input" />
              <button className="newsletter-button">Subscribe</button>
            </div>
          </div>
        </div> */}

        <Footer />
      </div>
    );
  }
}
