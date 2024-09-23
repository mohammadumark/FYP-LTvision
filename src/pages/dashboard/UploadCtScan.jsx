import React from 'react';
import './UploadCtScan.css'; // Assuming you will style it separately

const UploadCtScan = () => {
  return (
    <div className="upload-ct-scan">
      <button className="upload-btn">Upload Ct Scan</button>
      <div className="upload-area">
        <div className="upload-cloud">
          <p>drag and drop file here</p>
          <p>-OR-</p>
          <button className="choose-file-btn">Choose File</button>
        </div>
      </div>
    </div>
  );
};

export default UploadCtScan;