import React, { useState } from "react";
import axios from "axios";

const PackingForm = () => {
  const [tripType, setTripType] = useState("");
  const [weather, setWeather] = useState("");
  const [duration, setDuration] = useState("");
  const [recommendedItems, setRecommendedItems] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!tripType || !weather || !duration) {
      setError("Please fill in all fields");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await axios.post("http://127.0.0.1:5000/predict", {
        trip_type: tripType,
        weather: weather,
        duration: parseInt(duration),
      });

      setRecommendedItems(response.data.recommended_items);
    } catch (err) {
      setError("Error: Could not fetch recommendations");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="packing-form">
      <h2>Smart Packing Assistant</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Trip Type</label>
          <select
            value={tripType}
            onChange={(e) => setTripType(e.target.value)}
          >
            <option value="">Select Trip Type</option>
            <option value="vacation">Vacation</option>
            <option value="business">Business</option>
          </select>
        </div>

        <div>
          <label>Weather</label>
          <select
            value={weather}
            onChange={(e) => setWeather(e.target.value)}
          >
            <option value="">Select Weather</option>
            <option value="sunny">Sunny</option>
            <option value="rainy">Rainy</option>
            <option value="snowy">Snowy</option>
            <option value="windy">Windy</option>
          </select>
        </div>

        <div>
          <label>Duration (days)</label>
          <input
            type="number"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            placeholder="Enter trip duration"
          />
        </div>

        {error && <p style={{ color: "red" }}>{error}</p>}

        <button type="submit" disabled={loading}>
          {loading ? "Loading..." : "Get Packing List"}
        </button>
      </form>

      {recommendedItems && (
        <div>
          <h3>Recommended Packing List:</h3>
          <p>{recommendedItems}</p>
        </div>
      )}
    </div>
  );
};

export default PackingForm;
