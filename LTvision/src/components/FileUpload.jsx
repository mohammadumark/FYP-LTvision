import React, { useState } from 'react';
import Navbar from './Navbar';
import Navigation from './Navigation';
import './Navbar.css';
import './FileUpload.css';

const FileUpload = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setFile(e.dataTransfer.files[0]);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleUploadClick = () => {
    // Handle file upload logic here
    console.log('File uploaded:', file);
  };
 
  const handleOptionClick = (option) => {
    setSelectedOption(option);
  };

  const getCurrentMonthYear = () => {
    const now = new Date();
    const month = now.toLocaleString('default', { month: 'long' });
    const year = now.getFullYear();
    return `${month} ${year}`;
  };

  return (
    <div className="home-container-up">
      <Navigation selectedOption={selectedOption} handleOptionClick={handleOptionClick} />
      <div className="main-content-up">
      
        <div className="container">
      <div className="upload-section">
        <h3>Upload Ct Scan</h3>
        <a href="#" className="link">only document file acceptable here!</a>
        <button className="upload-button" onClick={handleUploadClick}>Upload</button>
        <p>drag & drop pdf or image here!</p>
        <div 
          className="drop-area" 
          onDrop={handleDrop} 
          onDragOver={handleDragOver}
        >
          <p>drag and drop file here</p>
          <p>-OR-</p>
          <input type="file" id="file" onChange={handleFileChange} hidden />
          <label htmlFor="file" className="choose-file-button">Choose File</label>
        </div>
      </div>
      <div className="scan-section">
        <img src=".\src\assets\doc-icon.png" alt="Document" className="doc-icon" />
        <img src=".\src\assets\check-icon.png" alt="Check" className="check-icon" />
        <button className="scan-button">Scan For Tumor</button>
      </div>
    </div>
        
      </div>
      <Navbar />
    </div>
  );
};

export default FileUpload;
