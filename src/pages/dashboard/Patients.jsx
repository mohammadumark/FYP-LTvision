import React, { useState, useEffect } from "react";
import axios from "axios";
import MedicalProfileScreen from "./MedicalProfileScreen"; // Import the MedicalProfileScreen component

export function Patients() {
  const [patients, setPatients] = useState([]);
  const [name, setName] = useState("");
  const [status, setStatus] = useState("Active");
  const [lastVisit, setLastVisit] = useState("");
  const [diagnosis, setDiagnosis] = useState("Normal"); // Set default diagnosis to Normal
  const [showForm, setShowForm] = useState(false); // Toggle form visibility
  const [showProfile, setShowProfile] = useState(false); // New state for toggling profile view
  const [selectedPatient, setSelectedPatient] = useState(null); // State to track selected patient

  // Get token from localStorage
  const token = localStorage.getItem("token"); // Get the JWT token from localStorage

  // Fetch patients on component mount
  useEffect(() => {
    fetchPatients();
  }, []);

  // Fetch the list of patients from the backend
  const fetchPatients = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/patients", {
        headers: {
          Authorization: `Bearer ${token}`, // Send token in Authorization header
        },
      });
      setPatients(response.data);
    } catch (error) {
      console.error("Error fetching patients:", error);
    }
  };

  // Handle the form submission for adding a new patient
  const handleAddPatient = async (e) => {
    e.preventDefault();

    if (!token) {
      console.error("Token is missing");
      return; // Handle appropriately
    }

    const patientData = {
      name,
      status,
      lastVisit,
      diagnosis,
    };

    try {
      const response = await axios.post(
        "http://localhost:5000/api/patients/add",
        patientData,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Send token in Authorization header
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Patient added successfully:", response.data);

      // Clear form fields after successful submission
      setName("");
      setStatus("Active");
      setLastVisit("");
      setDiagnosis("Normal");
      setShowForm(false); // Hide form after adding patient

      // Fetch updated patient list
      fetchPatients();
    } catch (error) {
      console.error("Error adding patient:", error.response ? error.response.data : error.message);
    }
  };

  // Handler to switch to the medical profile screen
  const handleViewProfile = (patient) => {
    setSelectedPatient(patient); // Save the selected patient details
    setShowProfile(true); // Switch to profile view
  };

  // Helper function to format the date
  const formatDate = (date) => {
    const formattedDate = new Date(date);
    return formattedDate.toISOString().split('T')[0]; // Formats as YYYY-MM-DD
  };

  // Helper function to determine the diagnosis color
  const getDiagnosisColor = (diagnosis) => {
    return diagnosis === "Normal" ? "text-green-500" : "text-red-500";
  };

  // Helper function to determine the status color
  const getStatusColor = (status) => {
    switch (status) {
      case "Active":
        return "text-blue-500";
      case "Non-Active":
        return "text-red-500";
      case "New Patient":
        return "text-green-500";
      default:
        return "text-black";
    }
  };

  // Render either the patient list or the profile screen based on state
  if (showProfile && selectedPatient) {
    return <MedicalProfileScreen patient={selectedPatient} />;
  }

  return (
    <div className="mt-12 mb-8 flex flex-col gap-12">
      <div className="p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Patient List</h2>
          <button
            className="bg-blue-500 text-white py-2 px-4 rounded"
            onClick={() => setShowForm(!showForm)}
          >
            + Add Patient
          </button>
        </div>

        {/* Patient Form */}
        {showForm && (
          <form id="addPatientForm" className="mb-4" onSubmit={handleAddPatient}>
            <div className="flex flex-col gap-2">
              <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="border rounded p-2"
              />
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="border rounded p-2"
              >
                <option value="Active">Active</option>
                <option value="Non-Active">Non-Active</option>
                <option value="New Patient">New Patient</option>
              </select>
              <input
                type="date"
                placeholder="Last Visit"
                value={lastVisit}
                onChange={(e) => setLastVisit(e.target.value)}
                required
                className="border rounded p-2"
              />
              <select
                value={diagnosis}
                onChange={(e) => setDiagnosis(e.target.value)}
                className="border rounded p-2"
              >
                <option value="Normal">Normal</option>
                <option value="Diagnosed">Diagnosed</option>
              </select>
              <button type="submit" className="bg-blue-500 text-white py-2 rounded">
                Add Patient
              </button>
            </div>
          </form>
        )}

        {/* Patient List Table */}
        <table className="min-w-full bg-white border rounded shadow-md">
          <thead>
            <tr className="bg-blue-100 text-left">
              <th className="py-2 px-4 border-b">NAME</th>
              <th className="py-2 px-4 border-b">#ID</th>
              <th className="py-2 px-4 border-b">STATUS</th>
              <th className="py-2 px-4 border-b">LAST VISIT</th>
              <th className="py-2 px-4 border-b">DIAGNOSIS</th>
              <th className="py-2 px-4 border-b">ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {patients.map((patient) => (
              <tr key={patient.id} className="hover:bg-gray-100">
                <td className="py-2 px-4 border-b">{patient.name}</td>
                <td className="py-2 px-4 border-b">{`P-${patient.id}`}</td> {/* Add P- prefix to ID */}
                <td className={`py-2 px-4 border-b ${getStatusColor(patient.status)}`}>{patient.status}</td>
                <td className="py-2 px-4 border-b">{formatDate(patient.lastVisit)}</td>
                <td className={`py-2 px-4 border-b ${getDiagnosisColor(patient.diagnosis)}`}>{patient.diagnosis}</td>
                <td className="py-2 px-4 border-b space-x-2">
                  <button
                    className="text-blue-500 hover:underline"
                    onClick={() => handleViewProfile(patient)}
                  >
                    Profile
                  </button>
                  <button className="text-red-500 hover:underline">Remove</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Patients;
