import React, { useState, useEffect } from "react";
import axios from "axios";
import MedicalProfileScreen from "./MedicalProfileScreen";

export function Patients() {
  const [patients, setPatients] = useState([]);
  const [name, setName] = useState("");
  const [status, setStatus] = useState("Active");
  const [lastVisit, setLastVisit] = useState("");
  const [diagnosis, setDiagnosis] = useState("Normal");
  const [showForm, setShowForm] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/patients", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setPatients(response.data);
    } catch (error) {
      console.error("Error fetching patients:", error);
    }
  };

  const handleAddPatient = async (e) => {
    e.preventDefault();
    if (!token) {
      console.error("Token is missing");
      return;
    }
    const patientData = { name, status, lastVisit, diagnosis };
    try {
      const response = await axios.post("http://localhost:5000/api/patients/add", patientData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      console.log("Patient added successfully:", response.data);
      setName("");
      setStatus("Active");
      setLastVisit("");
      setDiagnosis("Normal");
      setShowForm(false);
      fetchPatients();
    } catch (error) {
      console.error("Error adding patient:", error.response ? error.response.data : error.message);
    }
  };

  const handleViewProfile = (patient) => {
    setSelectedPatient(patient);
    setShowProfile(true);
  };

  const handleRemovePatient = async (patientId) => {
    const confirmed = window.confirm("Are you sure you want to remove this patient?");
    if (confirmed) {
      try {
        await axios.delete(`http://localhost:5000/api/patients/remove/${patientId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log("Patient removed successfully");
        fetchPatients(); // Fetch updated patient list
      } catch (error) {
        console.error("Error removing patient:", error.response ? error.response.data : error.message);
      }
    }
  };

  const formatDate = (date) => {
    const formattedDate = new Date(date);
    return formattedDate.toISOString().split('T')[0]; // Formats as YYYY-MM-DD
  };

  const getDiagnosisColor = (diagnosis) => {
    return diagnosis === "Normal" ? "text-green-500" : "text-red-500";
  };

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

  if (showProfile && selectedPatient) {
    return <MedicalProfileScreen patient={selectedPatient} />;
  }

  return (
    <div className="mt-12 mb-8 flex flex-col gap-12 px-6">
      <div className="p-6 bg-white shadow-lg rounded-lg">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-gray-800">Patient List</h2>
          <button className="bg-blue-600 text-white py-2 px-4 rounded-lg shadow-md hover:bg-blue-700 transition duration-200" onClick={() => setShowForm(!showForm)}>
            + Add Patient
          </button>
        </div>

        {showForm && (
          <form id="addPatientForm" className="mb-6 p-6 bg-gray-100 rounded-lg shadow-md" onSubmit={handleAddPatient}>
            <div className="flex flex-col gap-4">
              <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="border-2 border-gray-300 rounded-lg p-3"
              />
              <select value={status} onChange={(e) => setStatus(e.target.value)} className="border-2 border-gray-300 rounded-lg p-3">
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
                className="border-2 border-gray-300 rounded-lg p-3"
              />
              <select value={diagnosis} onChange={(e) => setDiagnosis(e.target.value)} className="border-2 border-gray-300 rounded-lg p-3">
                <option value="Normal">Normal</option>
                <option value="Diagnosed">Diagnosed</option>
              </select>
              <button type="submit" className="bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-200">
                Add Patient
              </button>
            </div>
          </form>
        )}

        <table className="min-w-full bg-white rounded-lg shadow-md overflow-hidden">
          <thead>
            <tr className="bg-blue-100 text-left text-sm font-semibold text-gray-700">
              <th className="py-3 px-6 border-b">NAME</th>
              <th className="py-3 px-6 border-b">#ID</th>
              <th className="py-3 px-6 border-b">STATUS</th>
              <th className="py-3 px-6 border-b">LAST VISIT</th>
              <th className="py-3 px-6 border-b">DIAGNOSIS</th>
              <th className="py-3 px-6 border-b">ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {patients.map((patient, index) => (
              <tr
                key={patient.id}
                className={`hover:bg-gray-50 ${index % 2 === 0 ? "bg-gray-100" : "bg-white"}`}
              >
                <td className="py-3 px-6 border-b text-sm text-gray-700">{patient.name}</td>
                <td className="py-3 px-6 border-b text-sm text-gray-700">{`P-${patient.id}`}</td>
                <td className={`py-3 px-6 border-b text-sm ${getStatusColor(patient.status)}`}>{patient.status}</td>
                <td className="py-3 px-6 border-b text-sm text-gray-700">{formatDate(patient.lastVisit)}</td>
                <td className={`py-3 px-6 border-b text-sm ${getDiagnosisColor(patient.diagnosis)}`}>{patient.diagnosis}</td>
                <td className="py-3 px-6 border-b text-sm space-x-4">
                  <button
                    className="text-blue-600 hover:text-blue-700 font-semibold transition duration-200"
                    onClick={() => handleViewProfile(patient)}
                  >
                    View Profile
                  </button>
                  <button
                    className="text-red-600 hover:text-red-700 font-semibold transition duration-200"
                    onClick={() => handleRemovePatient(patient.id)}
                  >
                    Remove
                  </button>
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
