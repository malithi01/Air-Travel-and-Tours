from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib

app = Flask(__name__)
CORS(app)

# Load model and encoders
model = joblib.load('packing_model.pkl')
le_trip_type = joblib.load('le_trip_type.pkl')
le_weather = joblib.load('le_weather.pkl')
le_items = joblib.load('le_items.pkl')

@app.route("/")
def home():
    return "Flask API is running!"

@app.route("/predict", methods=["POST"])
def predict():
    try:
        data = request.get_json()

        trip_type = data.get("trip_type")
        weather = data.get("weather")
        duration = data.get("duration")

        # Input validation
        if not all([trip_type, weather, isinstance(duration, int)]):
            return jsonify({"error": "Invalid input"}), 400

        # Encode inputs
        encoded_trip_type = le_trip_type.transform([trip_type])[0]
        encoded_weather = le_weather.transform([weather])[0]

        # Make prediction
        prediction = model.predict([[encoded_trip_type, encoded_weather, duration]])
        recommended_items = le_items.inverse_transform(prediction)[0]

        return jsonify({
            "trip_type": trip_type,
            "weather": weather,
            "duration": duration,
            "recommended_items": recommended_items
        })

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True)
