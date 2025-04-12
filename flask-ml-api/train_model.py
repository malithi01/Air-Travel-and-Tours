import pandas as pd
from sklearn.preprocessing import LabelEncoder
from sklearn.ensemble import RandomForestClassifier
import joblib

# Creating the dataset
data = {
    'trip_type': [
        'vacation', 'vacation', 'vacation',
        'business', 'business', 'business',
        'vacation', 'business'
    ],
    'weather': [
        'sunny', 'rainy', 'snowy',
        'sunny', 'rainy', 'snowy',
        'windy', 'windy'
    ],
    'duration': [
        7, 5, 6,
        3, 2, 4,
        4, 3
    ],
    'recommended_items': [
        't-shirts, shorts, sunglasses, sunscreen, sandals, swimwear',
        'raincoat, waterproof shoes, umbrella, t-shirts, jeans, towel',
        'thermal wear, jacket, gloves, snow boots, scarf, beanie',
        'formal shirts, trousers, laptop, blazer, dress shoes, notepad',
        'umbrella, formal wear, raincoat, laptop, waterproof shoes, business cards',
        'thermal suit, coat, gloves, laptop, formal shoes, scarf',
        'windbreaker, hoodie, jeans, travel pillow, book, sunglasses',
        'windbreaker, formal pants, documents, power bank, umbrella, laptop'
    ]
}

df = pd.DataFrame(data)

# Encoding categorical columns
le_trip_type = LabelEncoder()
le_weather = LabelEncoder()
le_items = LabelEncoder()

df['trip_type_encoded'] = le_trip_type.fit_transform(df['trip_type'])
df['weather_encoded'] = le_weather.fit_transform(df['weather'])
df['recommended_items_encoded'] = le_items.fit_transform(df['recommended_items'])

# Preparing inputs and outputs
X = df[['trip_type_encoded', 'weather_encoded', 'duration']]
y = df['recommended_items_encoded']

# Training the model
model = RandomForestClassifier()
model.fit(X, y)

# Save the model and encoders
joblib.dump(model, 'packing_model.pkl')
joblib.dump(le_trip_type, 'le_trip_type.pkl')
joblib.dump(le_weather, 'le_weather.pkl')
joblib.dump(le_items, 'le_items.pkl')

print("✅ Model and encoders saved successfully!")
