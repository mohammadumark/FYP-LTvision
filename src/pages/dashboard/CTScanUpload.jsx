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
        } else {
            setPreview(null);
        }
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