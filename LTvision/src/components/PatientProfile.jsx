import React from 'react';
import { useParams } from 'react-router-dom';
import './PatientProfile.css';

const patients = [
  {
    name: "Kumar Sharma",
    id: "P-03",
    age: 25,
    weight: "65kg",
    gender: "Male",
    contact: "+92 3448765432",
    address: "Phase 4, Isbd",
    allergies: "Nuts",
    email: "kumar2@gmail.com",
    medicalHistory: [
      { date: "March 07, 2024", description: "Diet Discussion", doctor: "Dr. Kumar Sharma" },
      { date: "March 02, 2024", description: "Chemotherapy", doctor: "Dr. Kumar Sharma" },
      { date: "March 01, 2024", description: "Report Analysis", doctor: "Dr. Kumar Sharma" },
      { date: "February 01, 2024", description: "Operate Disease", doctor: "Dr. Kumar Sharma" },
      { date: "January 03, 2024", description: "Symptoms Analysis", doctor: "Dr. Kumar Sharma" }
    ],
    diet: {
      toEat: ["Bread", "All Vegetables", "All Fruits", "Olive Oil", "Water 5L Daily", "Red Meat Once a Week"],
      toAvoid: ["Rice", "Butter", "Spices", "Cooking Oil", "Eggs", "Chocolate"]
    },
    report: {
      analysis: "Diagnosed with 1st stage liver cancer.",
      treatment: "Treatment in process."
    }
  }
];

const PatientProfile = () => {
  const { id } = useParams();
  const patient = patients.find(p => p.id === id);

  if (!patient) {
    return <div>Patient not found</div>;
  }

  return (
    <div className="profile-container">
      <div className="profile-sidebar">
        <img src="path-to-profile-image.jpg" alt={patient.name} className="profile-image" />
        <h2>{patient.name}</h2>
        <p>Age: {patient.age} | Weight: {patient.weight} | Gender: {patient.gender}</p>
        <button>Contact: {patient.contact}</button>
        <button>Address: {patient.address}</button>
        <button>Allergies: {patient.allergies}</button>
        <button>Mail: {patient.email}</button>
      </div>
      <div className="profile-history">
        <div className="medical-history">
          <h3>Medical History</h3>
          {patient.medicalHistory.map((entry, index) => (
            <div key={index} className="history-entry">
              <h4>{entry.date}</h4>
              <p>{entry.description}</p>
              <p>{entry.doctor}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="profile-diet-report">
        <div className="diet-recommendation">
          <h3>Diet Recommended</h3>
          <div className="diet-section">
            <div className="diet-to-eat">
              <h4>What to Eat</h4>
              <ul>
                {patient.diet.toEat.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
            <div className="diet-to-avoid">
              <h4>What to Avoid</h4>
              <ul>
                {patient.diet.toAvoid.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div className="report-section">
          <h3>Report</h3>
          <button className="btn-remove">Remove</button>
          <p>Report Analysis: {patient.report.analysis}</p>
          <p>Treatment: {patient.report.treatment}</p>
        </div>
      </div>
    </div>
  );
};

export default PatientProfile;
