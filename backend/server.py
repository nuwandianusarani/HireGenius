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

def assign_marks(prediction, allocatedMarks):
    """
    Assign marks based on the prediction value.
    Customize this logic based on your use case.
    """
    cluster_priority = [3, 2, 1, 4, 0]

    if prediction not in cluster_priority:
        raise ValueError(f"Invalid prediction: {prediction}. Must be one of {cluster_priority}.")

    # # Determine the priority rank (0-based index)
    rank = cluster_priority.index(prediction)

    # # Calculate the marks
    marks_ratio = (len(cluster_priority) - rank) / len(cluster_priority)

    allocatedMarks = float(allocatedMarks)

    # print(f"Prediction: {prediction}")
    print(f"Allocated Marks: {allocatedMarks}")
    # print(f"Assigned Marks: {assigned_marks}")

    return allocatedMarks * marks_ratio

# Define the POST endpoint
@app.route('/predict', methods=['POST'])
def predict_endpoint():
    try:
        # Parse input JSON data
        data = request.json
        if not data:
            return jsonify({"error": "No input data provided"}), 400

        #Extract MArks from the request
        allocatedMarks = data.get('marks')

        
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
        print("Prediction:", prediction)

        # Convert the prediction to a native Python type (float)
        prediction = prediction[0] if isinstance(prediction, np.ndarray) else prediction

        # Assign marks based on the prediction (assuming it's a scalar output)
        marks = assign_marks(prediction, allocatedMarks)

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
