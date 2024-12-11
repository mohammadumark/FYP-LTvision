from flask import Flask, request, jsonify
from flask_cors import CORS  # Import CORS
import numpy as np
import tensorflow as tf
from PIL import Image
from io import BytesIO
import base64
import matplotlib.pyplot as plt
import logging
import cv2

# Initialize the Flask app and enable CORS
app = Flask(__name__)
CORS(app)

# Load the pre-trained tumor detection model
model_path = 'saveunet_tumor_model.h5'  # Change this to the actual path of your model file
model = tf.keras.models.load_model(model_path)

# Function to analyze the tumor in the predicted mask
def analyze_tumor(mask, pixel_spacing=1):
    
    # Apply a threshold to the mask
    binary_mask = (mask > 0.5).astype(np.uint8)  # Binarize the mask
    has_tumor = np.any(binary_mask)  # Check if any tumor exists

    if has_tumor:
        # Calculate the size of the tumor in square millimeters
        tumor_size = np.sum(binary_mask) * (pixel_spacing**2)

        # Find bounding box for the tumor
        x, y, w, h = cv2.boundingRect(binary_mask)
        tumor_location = (x, y, x + w, y + h)

        # Calculate confidence as the mean activation within the tumor region
        confidence = np.mean(mask[binary_mask == 1])
    else:
        tumor_size = 0
        tumor_location = None
        confidence = 0

    return has_tumor, tumor_size, tumor_location, confidence

# Function to prepare image before passing to the model
def prepare_image(image):
    image = image.resize((180, 180)).convert('L')  # Resize to model's expected input size
    image = np.array(image).astype(np.float32) / 255.0  # Normalize the image
    image = np.expand_dims(np.expand_dims(image, axis=-1), axis=0)  # Add batch dimension
    return image

# Function to convert image to base64 encoding
def image_to_base64(image_bytes):
    # Convert bytes to a PIL Image
    img = Image.open(BytesIO(image_bytes))
    
    # Save image to a buffer
    buffered = BytesIO()
    img.save(buffered, format="PNG")
    
    # Encode the image as base64
    img_str = base64.b64encode(buffered.getvalue()).decode("utf-8")
    return img_str

# Endpoint to handle prediction requests
@app.route('/predict', methods=['POST'])
def predict():
    if 'image' not in request.files:
        return jsonify({'error': 'No image provided'}), 400

    file = request.files['image']
    image = Image.open(BytesIO(file.read()))  # Read the image file
    test_image = prepare_image(image)
    
    # Predict the tumor mask using the model
    predicted_mask = model.predict(test_image)[0]
    
    # Analyze the predicted mask
    has_tumor, tumor_size, tumor_location, confidence = analyze_tumor(predicted_mask)
    
    if has_tumor:
        result = {
            'tumor_detected': True,
            'size': f"{tumor_size:.2f} mm²",
            'location': str(tumor_location),
            'confidence': f"{confidence * 100:.2f}%",  # Convert confidence to percentage
        }
        
        # Creating the mask and bounding box image
        plt.figure(figsize=(10, 5))

        # Original Image
        plt.subplot(1, 3, 1)
        plt.title("Original Image")
        plt.imshow(np.array(image), cmap='gray')

        # Predicted Mask
        plt.subplot(1, 3, 2)
        plt.title("Predicted Mask")
        plt.imshow(predicted_mask.squeeze(), cmap='jet')

        # Save the image to a buffer and convert to base64
        buffered = BytesIO()
        plt.savefig(buffered, format="png")
        buffered.seek(0)  # Rewind to the start of the buffer

        # Convert the buffer content to base64
        img_str = image_to_base64(buffered.getvalue())
        result['image'] = img_str  # Add the base64 image to the result

    else:
        result = {'tumor_detected': False}

    return jsonify(result)

# Run the Flask app
if __name__== '_main_':
    app.run(debug=True)