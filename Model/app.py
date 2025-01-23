from flask import Flask, request, jsonify
from flask_cors import CORS
import numpy as np
import tensorflow as tf
from PIL import Image
from io import BytesIO
import base64
import matplotlib.pyplot as plt
import cv2

# Initialize the Flask app and enable CORS
app = Flask(__name__)
CORS(app)

# Load the pre-trained tumor detection model
model_path = 'saveunet_tumor_model.h5'  # Update with the actual path to your model
model = tf.keras.models.load_model(model_path)

# Function to analyze the tumor in the predicted mask
def analyze_tumor(mask, original_width, original_height, pixel_spacing=1):
    binary_mask = (mask > 0.5).astype(np.uint8)  # Binarize the mask
    has_tumor = np.any(binary_mask)  # Check if any tumor exists

    if has_tumor:
        tumor_size = np.sum(binary_mask) * (pixel_spacing**2)  # Calculate tumor size
        x, y, w, h = cv2.boundingRect(binary_mask)  # Find bounding box
        
        # Scale bounding box coordinates back to the original image dimensions
        scale_x = original_width / 180
        scale_y = original_height / 180
        tumor_location = (
            int(x * scale_x),
            int(y * scale_y),
            int((x + w) * scale_x),
            int((y + h) * scale_y),
        )
        confidence = np.mean(mask[binary_mask == 1])  # Calculate confidence
    else:
        tumor_size = 0
        tumor_location = None
        confidence = 0

    return has_tumor, tumor_size, tumor_location, confidence

# Function to prepare the image before passing it to the model
def prepare_image(image):
    image = image.resize((180, 180)).convert('L')  # Resize and convert to grayscale
    image = np.array(image).astype(np.float32) / 255.0  # Normalize
    image = np.expand_dims(np.expand_dims(image, axis=-1), axis=0)  # Add batch and channel dimensions
    return image

# Function to convert image to base64 encoding
def image_to_base64(image_bytes):
    buffered = BytesIO(image_bytes)
    img_str = base64.b64encode(buffered.getvalue()).decode("utf-8")
    return img_str

# Endpoint to handle prediction requests
@app.route('/predict', methods=['POST'])
def predict():
    if 'image' not in request.files:
        return jsonify({'error': 'No image provided'}), 400

    file = request.files['image']
    image = Image.open(BytesIO(file.read()))  # Read the image file
    original_image = np.array(image)  # Convert to numpy array for visualization
    original_width, original_height = image.size  # Original image dimensions
    test_image = prepare_image(image)

    # Predict the tumor mask
    predicted_mask = model.predict(test_image)[0].squeeze()

    # Analyze the predicted mask
    has_tumor, tumor_size, tumor_location, confidence = analyze_tumor(
        predicted_mask, original_width, original_height
    )

    if has_tumor:
        result = {
            'tumor_detected': True,
            'size': f"{tumor_size:.2f} mm²",
            'location': str(tumor_location),
            'confidence': f"{confidence * 100:.2f}%",
        }

        # Plotting the images with bounding box
        fig, axes = plt.subplots(1, 3, figsize=(15, 5))

        # Original Image
        axes[0].imshow(original_image, cmap='gray')
        axes[0].set_title("Original Image")
        axes[0].axis('off')

        # Predicted Mask
        axes[1].imshow(predicted_mask, cmap='jet')
        axes[1].set_title("Predicted Mask")
        axes[1].axis('off')

        # Original Image with Bounding Box
        axes[2].imshow(original_image, cmap='gray')
        axes[2].set_title("Image with Bounding Box")
        axes[2].axis('off')

        if tumor_location:
            x1, y1, x2, y2 = tumor_location
            rect = plt.Rectangle((x1, y1), x2 - x1, y2 - y1, 
                                 linewidth=2, edgecolor='r', facecolor='none')
            axes[2].add_patch(rect)

        # Save the plot to a buffer
        buffer = BytesIO()
        plt.tight_layout()
        plt.savefig(buffer, format='png')
        buffer.seek(0)

        # Convert the buffer content to base64
        result['image'] = image_to_base64(buffer.getvalue())
        plt.close(fig)

    else:
        result = {'tumor_detected': False}

    return jsonify(result)

# Run the Flask app
if __name__ == '__main__':
    app.run(debug=True)
