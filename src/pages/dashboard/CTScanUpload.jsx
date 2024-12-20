import React, { useState } from "react";

const CTScanUpload = ({ onUploadComplete }) => {
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
    <div className="flex justify-center items-center min-h-screen bg-gray-50 p-6">
      <div className="flex gap-6 bg-white p-8 rounded-lg shadow-lg w-[90%] sm:w-[80%] md:w-[70%] lg:w-[60%] h-[500px]">
        {/* Upload Section */}
        <div className="w-full md:w-1/2 flex flex-col items-center border-r border-gray-200">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Upload CT Scan</h2>
          <p className="text-gray-600 mb-6">Only document files are accepted!</p>
          <div className="border-2 border-dashed border-blue-500 p-6 rounded-md text-center mb-6 w-50">
            <div className="text-blue-500 mb-4">
              <svg
                className="w-10 h-10 mx-auto"
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
              className="mt-4 bg-gray-200 text-gray-700 py-2 px-6 rounded-lg cursor-pointer hover:bg-gray-300 transition"
            >
              Choose File
            </label>
          </div>
          <button
            className="bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 transition"
            onClick={handleSubmit}
          >
            Upload
          </button>
        </div>

        {/* Preview Section */}
        <div className="w-full md:w-1/2 flex flex-col items-center">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Preview</h2>
          {preview ? (
            <img
              src={preview}
              alt="Preview"
              className="max-w-full max-h-64 rounded-md shadow-md"
            />
          ) : (
            <p className="text-gray-600">No file selected</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CTScanUpload;
