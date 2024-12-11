import React, { useState } from "react";
import "./CTScanUpload.css";

function CTScanUpload({ onUploadComplete }) {
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState(null);

    // Handle image selection
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImage(file);

        // Generate a preview URL
        if (file) {
            const previewURL = URL.createObjectURL(file);
            setPreview(previewURL);

            // Check if the image is colorful
            checkIfColorful(file);
        } else {
            setPreview(null);
        }
    };

    // Function to check if the image is colorful or grayscale
    const checkIfColorful = (file) => {
        const img = new Image();
        img.src = URL.createObjectURL(file);

        img.onload = () => {
            const canvas = document.createElement("canvas");
            const ctx = canvas.getContext("2d");

            // Set the canvas size to match the image
            canvas.width = img.width;
            canvas.height = img.height;

            // Draw the image onto the canvas
            ctx.drawImage(img, 0, 0, img.width, img.height);

            // Get the pixel data from the canvas
            const imageData = ctx.getImageData(0, 0, img.width, img.height);
            const pixels = imageData.data;
            let isColorful = false;

            // Iterate over the pixels and check if they are not grayscale
            for (let i = 0; i < pixels.length; i += 4) {
                const r = pixels[i]; // Red channel
                const g = pixels[i + 1]; // Green channel
                const b = pixels[i + 2]; // Blue channel

                // If the RGB values are not equal, the pixel is not grayscale
                if (r !== g || g !== b) {
                    isColorful = true;
                    break;
                }
            }

            // If the image is colorful, show an alert
            if (isColorful) {
                alert("Please upload a CT scan image only. Avoid uploading colorful images.");
                setImage(null);
                setPreview(null); // Clear preview if image is not valid
            }
        };
    };

    // Handle submission
    const handleSubmit = () => {
        if (!image) {
            alert("Please upload an image.");
            return;
        }

        onUploadComplete(image);
    };

    return (
        <div className="ctscan-container">
            <h1 className="ctscan-title">Upload CT Scan</h1>
            <label htmlFor="image" className="ctscan-label">Upload CT scan image:</label>
            <input
                type="file"
                id="image"
                accept="image/*"
                onChange={handleImageChange}
                className="ctscan-input"
            />

            {preview && (
                <div className="ctscan-preview-container">
                    <h3>Image Preview:</h3>
                    <img src={preview} alt="Preview" className="ctscan-preview-image" />
                </div>
            )}

            <button onClick={handleSubmit} className="ctscan-button">Submit</button>
        </div>
    );
}

export default CTScanUpload;