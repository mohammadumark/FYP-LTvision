import React, { useState, useEffect } from "react";
import axios from "axios";

export function Patients() {
  const [patients, setPatients] = useState([]);
  const [name, setName] = useState("");
  const [id, setId] = useState("");
  const [status, setStatus] = useState("Active");
  const [lastVisit, setLastVisit] = useState("");
  const [diagnosis, setDiagnosis] = useState("");

  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/patients");
      setPatients(response.data);
    } catch (error) {
      console.error("Error fetching patients:", error);
    }
  };

  const handleAddPatient = async (e) => {
    e.preventDefault();

    const patientData = {
      name,
      id,
      status,
      lastVisit,
      diagnosis,
    };

    try {
      const response = await axios.post("http://localhost:5000/api/patients/add", patientData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log("Patient added successfully:", response.data);
      
      // Clear form fields after successful submission
      setName("");
      setId("");
      setStatus("Active");
      setLastVisit("");
      setDiagnosis("");

      // Fetch updated patient list
      fetchPatients();
    } catch (error) {
      console.error("Error adding patient:", error.response ? error.response.data : error.message);
    }
  };

  return (
    <div className="mt-12 mb-8 flex flex-col gap-12">
      <div className="p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Patient List</h2>
          <button
            className="bg-blue-500 text-white py-2 px-4 rounded"
            onClick={() => document.getElementById("addPatientForm").classList.toggle("hidden")}
          >
            + Add Patient
          </button>
        </div>

        <form id="addPatientForm" className="mb-4 hidden" onSubmit={handleAddPatient}>
          <div className="flex flex-col gap-2">
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="border rounded p-2"
            />
            <input
              type="text"
              placeholder="#ID"
              value={id}
              onChange={(e) => setId(e.target.value)}
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
            <input
              type="text"
              placeholder="Diagnosis"
              value={diagnosis}
              onChange={(e) => setDiagnosis(e.target.value)}
              required
              className="border rounded p-2"
            />
            <button type="submit" className="bg-blue-500 text-white py-2 rounded">
              Add Patient
            </button>
          </div>
        </form>

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
            {patients.map((patient, index) => (
              <tr key={index} className="hover:bg-gray-100">
                <td className="py-2 px-4 border-b">{patient.name}</td>
                <td className="py-2 px-4 border-b">{patient.id}</td>
                <td className={`py-2 px-4 border-b ${patient.statusColor}`}>{patient.status}</td>
                <td className="py-2 px-4 border-b">{patient.lastVisit}</td>
                <td className={`py-2 px-4 border-b ${patient.diagnosisColor}`}>{patient.diagnosis}</td>
                <td className="py-2 px-4 border-b space-x-2">
                  <button className="text-red-500 hover:underline">Remove</button>
                  <a href="#" className="text-blue-500 hover:underline">Profile</a>
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
