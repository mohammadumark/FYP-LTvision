import React, { useState } from "react";

const UploadCtScans = ({ onUploadComplete }) => {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  // Handle file/image selection
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
      alert("Please upload a file.");
      return;
    }

    // Placeholder upload logic
    onUploadComplete(image);
  };

  return (
    <div className="flex gap-4 p-8 bg-white rounded shadow-md w-full">
      {/* Upload Section */}
      <div className="w-1/2 flex flex-col items-center border-r border-gray-200">
        <h2 className="text-lg font-bold mb-2">Upload CT Scan</h2>
        <p className="text-gray-600 mb-4">Only document files are acceptable!</p>
        <div className="border-2 border-dashed border-blue-400 p-4 rounded-md text-center mb-4 w-64">
          <div className="text-blue-400 mb-2">
            <svg
              className="w-8 h-8 mx-auto"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M7 16V4m4 4v12m4-8v8m4 0H5m16 0a2 2 0 002-2V4a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </div>
          <p className="text-sm text-gray-600 mb-2">Drag and drop a file here</p>
          <p className="text-gray-400">- OR -</p>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
            id="file-upload"
          />
          <label
            htmlFor="file-upload"
            className="mt-2 bg-gray-200 text-gray-700 py-1 px-4 rounded cursor-pointer hover:bg-gray-300"
          >
            Choose File
          </label>
        </div>
        <button
          className="bg-blue-500 text-white py-2 px-4 rounded"
          onClick={handleSubmit}
        >
          Upload
        </button>
      </div>

      {/* Preview Section */}
      <div className="w-1/2 flex flex-col items-center">
        <h2 className="text-lg font-bold mb-2">Preview</h2>
        {preview ? (
          <img
            src={preview}
            alt="Preview"
            className="max-w-full max-h-64 rounded shadow-md"
          />
        ) : (
          <p className="text-gray-600">No file selected</p>
        )}
      </div>
    </div>
  );
};

export default UploadCtScans;
