// UploadCtScan.jsx
import React, { useState } from 'react';

const UploadCtScans = () => {
  const [file, setFile] = useState(null);
  const [scanned, setScanned] = useState(false);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleScan = () => {
    // Logic for scanning the file
    setScanned(true);
  };

  return (
    <div className="flex gap-4 p-8 bg-white rounded shadow-md w-full">
      {/* Upload Section */}
      <div className="w-1/2 flex flex-col items-center border-r border-gray-200">
        <h2 className="text-lg font-bold mb-2">Upload Ct Scan</h2>
        <p className="text-gray-600 mb-4">only document file acceptable here!</p>
        <button className="bg-blue-500 text-white py-2 px-4 rounded mb-4">Upload</button>
        <p className="text-gray-600 mb-2">drag & drop pdf or image here!</p>
        <div className="border-2 border-dashed border-blue-400 p-4 rounded-md text-center mb-4 w-64">
          <div className="text-blue-400 mb-2">
            <svg className="w-8 h-8 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16V4m4 4v12m4-8v8m4 0H5m16 0a2 2 0 002-2V4a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <p className="text-sm text-gray-600 mb-2">drag and drop file here</p>
          <p className="text-gray-400">- OR -</p>
          <input type="file" onChange={handleFileChange} className="hidden" id="file-upload" />
          <label
            htmlFor="file-upload"
            className="mt-2 bg-gray-200 text-gray-700 py-1 px-4 rounded cursor-pointer hover:bg-gray-300"
          >
            Choose File
          </label>
        </div>
      </div>

      {/* Scan Section */}
      <div className="w-1/2 flex flex-col items-center justify-center">
        {file ? (
          <>
            <div className="flex flex-col items-center mb-4">
              <div className="bg-blue-500 p-4 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 24 24" width="40px" height="40px">
                  <path d="M10 4h4v2h-4zM4 4h4v2H4zm6 14h4v2h-4zm-6 0h4v2H4zM8 6v12l6-6zm4 2h8v8h-8z" />
                </svg>
              </div>
              <p className="text-blue-500 mt-2 text-center">DOC</p>
            </div>
            {scanned ? (
              <div className="flex flex-col items-center">
                <div className="bg-green-500 p-2 rounded-full">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 24 24" width="40px" height="40px">
                    <path d="M20.285,4.711l-11.13,11.13-4.345-4.345c-0.391-0.391-1.023-0.391-1.414,0s-0.391,1.023,0,1.414l5.06,5.06c0.391,0.391,1.023,0.391,1.414,0l12-12c0.391-0.391,0.391-1.023,0-1.414S20.676,4.32,20.285,4.711z" />
                  </svg>
                </div>
                <p className="text-green-500 mt-2">Scanned Successfully</p>
              </div>
            ) : (
              <button
                className="bg-blue-500 text-white py-2 px-4 rounded mt-4"
                onClick={handleScan}
              >
                Scan For Tumor
              </button>
            )}
          </>
        ) : (
          <p className="text-gray-600">No file uploaded yet</p>
        )}
      </div>
    </div>
  );
};

export default UploadCtScans;
