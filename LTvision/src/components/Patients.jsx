import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaFilePdf, FaUserCircle } from 'react-icons/fa';
import Navbar from './Navbar';
import Navigation from './Navigation';
import './Navbar.css';
import './PatientTable.css';

const patients = [
  { name: "Huzaifa Dilshad", id: "P-01", status: "Active", lastVisit: "05-02-2024", diagnosis: "Normal" },
  { name: "Ahmad Baig", id: "P-02", status: "Non-Active", lastVisit: "05-02-2024", diagnosis: "Normal" },
  { name: "Kumar Sharma", id: "P-03", status: "Active", lastVisit: "05-02-2024", diagnosis: "Diagnosed" },
  { name: "Mustafa Khan", id: "P-04", status: "Active", lastVisit: "05-02-2024", diagnosis: "Normal" },
  { name: "Rao m.Hanzala", id: "P-05", status: "New Patient", lastVisit: "05-02-2024", diagnosis: "Diagnosed" },
  { name: "Shoukat Magsi", id: "P-06", status: "Active", lastVisit: "05-02-2024", diagnosis: "Normal" },
  { name: "Nawaz Sharif", id: "P-07", status: "Non-Active", lastVisit: "05-02-2024", diagnosis: "Diagnosed" },
  { name: "Ali Abbasi", id: "P-08", status: "Active", lastVisit: "05-02-2024", diagnosis: "Normal" },
  { name: "Jawad Sultan", id: "P-09", status: "Active", lastVisit: "05-02-2024", diagnosis: "Normal" },
  { name: "Jawad Sultan", id: "P-09", status: "Active", lastVisit: "05-02-2024", diagnosis: "Normal" },
  { name: "Jawad Sultan", id: "P-09", status: "Active", lastVisit: "05-02-2024", diagnosis: "Normal" },
];

const Patients = () => {
  const navigate = useNavigate();
  const [selectedOption, setSelectedOption] = useState(null);

  const handleOptionClick = (option) => {
    setSelectedOption(option);
  };

  const handleProfileClick = (id) => {
    navigate(`/patients/profile/${id}`);
  };

  return (
    <div className="home-container">
      <Navigation selectedOption={selectedOption} handleOptionClick={handleOptionClick} />
      <div className="main-content">
        <div className="inner-container-p">
          <div className="table-container">
            <table className="patient-table">
              <thead>
                <tr>
                  <th>NAME</th>
                  <th>#ID</th>
                  <th>STATUS</th>
                  <th>LAST VISIT</th>
                  <th>Diagnosis</th>
                  <th>Report</th>
                  <th></th> 
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {patients.map((patient, index) => (
                  <tr key={index}>
                    <td>
                      <FaUserCircle className="user-icon" />
                      {patient.name}
                    </td>
                    <td>{patient.id}</td>
                    <td className={`status ${patient.status.toLowerCase().replace(" ", "-")}`}>{patient.status}</td>
                    <td>{patient.lastVisit}</td>
                    <td className={`diagnosis ${patient.diagnosis.toLowerCase()}`}>{patient.diagnosis}</td>
                    <td>
                      <FaFilePdf className="pdf-icon" /> 
                    </td>
                    <td>
                      <button className='btn-remove'>Remove</button>
                    </td>
                    <td>
                      <button className='btn-profile' onClick={() => handleProfileClick(patient.id)}>Profile</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <Navbar />
    </div>
  );
};

export default Patients;
