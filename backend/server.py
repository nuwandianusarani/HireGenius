from flask import Flask, request, jsonify
from flask_cors import CORS
import numpy as np
import joblib  # Use joblib instead of h5py
from sklearn.preprocessing import MinMaxScaler  # Import MinMaxScaler

# Initialize Flask app
app = Flask(__name__)

# Enable CORS
CORS(app)

# Load the model using joblib (replace with your actual file path)
model_file = 'kmeans_github_model.h5'

# Load the model (if it's a Scikit-learn model)
model = joblib.load(model_file)

# Load the pre-trained MinMaxScaler (fit with your training data)
scaler_file = 'standard_scaler.pkl'  # Replace with your actual scaler file path
scaler = joblib.load(scaler_file)

# Define a function to assign marks based on the prediction
def assign_marks(prediction):
    """
    Assign marks based on the prediction value.
    Customize this logic based on your use case.
    """
    print(prediction)

    if prediction > 0.8:
        return 90
    elif prediction > 0.5:
        return 70
    else:
        return 50

# Define the POST endpoint
@app.route('/predict', methods=['POST'])
def predict_endpoint():
    try:
        # Parse input JSON data
        data = request.json
        if not data:
            return jsonify({"error": "No input data provided"}), 400
        
        # Extract features from the request
        features = data.get('features')  # Expecting a list of features
        if not features:
            return jsonify({"error": "Features missing in request"}), 400

        # Convert features to numpy array
        features = np.array(features).reshape(1, -1)  # Adjust shape if needed

        # Normalize the features
        features_normalized = scaler.transform(features)

        # Verify the normalized data (optional for debugging)
        print("Normalized Features:", features_normalized)

        # Make prediction
        prediction = model.predict(features_normalized)  # Use the model's predict method

        # Convert the prediction to a native Python type (float)
        prediction = prediction[0] if isinstance(prediction, np.ndarray) else prediction

        # Assign marks based on the prediction (assuming it's a scalar output)
        marks = assign_marks(prediction)

        # Prepare response
        response = {
            "prediction": float(prediction),  # Ensure it's a native float
            "marks": marks
        }

        return jsonify(response), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Run the app
if __name__ == '__main__':
    app.run(debug=True)
