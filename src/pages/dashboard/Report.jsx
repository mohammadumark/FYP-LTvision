import React, { useState, useEffect } from "react";
import axios from "axios";
import { jsPDF } from "jspdf";
import "./Report.css";

function Report({ image }) {
  const [loading, setLoading] = useState(true);
  const [result, setResult] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [patientDetails, setPatientDetails] = useState({
    name: '',
    age: '',
    gender: '',
    bloodGroup: ''
  });

  const fetchReport = async () => {
    if (!image) {
      alert("No image provided for prediction.");
      setLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append("image", image);

    try {
      const response = await axios.post(
        "http://127.0.0.1:5000/predict",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      setResult(response.data || {});
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while processing the image.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReport();
  }, [image]);

  const saveReportAsPDF = () => {
    const doc = new jsPDF();

    // Header Section
    doc.setFont("helvetica", "bold");
    doc.setFontSize(24);
    doc.setTextColor(0, 70, 130);  // Dark Blue color for hospital report
    doc.text("Medical Prediction Report", 105, 20, null, null, "center");

    doc.setLineWidth(2);
    doc.setDrawColor(0, 70, 130);
    doc.line(20, 30, 190, 30);

    // Patient Info Section
    doc.setFontSize(18);
    doc.setTextColor(50, 50, 50);
    doc.text(`Patient Name: ${patientDetails.name}`, 20, 40);
    doc.text(`Age: ${patientDetails.age}`, 20, 50);
    doc.text(`Gender: ${patientDetails.gender}`, 20, 60);
    doc.text(`Blood Group: ${patientDetails.bloodGroup}`, 20, 70);

    // Report Title Section
    doc.setFontSize(18);
    doc.setTextColor(50, 50, 50);
    doc.text("Tumor Detection Status", 20, 80);

    // Tumor Detection Status
    doc.setFontSize(16);
    if (result && result.tumor_detected) {
      doc.setTextColor(211, 47, 47);  // Red for detected
      doc.text("Tumor Detected", 20, 90);
    } else {
      doc.setTextColor(56, 142, 60);  // Green for no tumor
      doc.text("No Tumor Detected", 20, 90);
    }

    // Additional Information Section
    doc.setFontSize(14);
    doc.setTextColor(50, 50, 50);
    doc.text("Size: " + (result?.size || "N/A"), 20, 100);
    doc.text("Location: " + (result?.location || "N/A"), 20, 110);

    doc.setLineWidth(1);
    doc.setDrawColor(0, 70, 130);
    doc.line(20, 120, 190, 120);  // Line separator

    // Adding the image (if exists)
    if (result?.image) {
      const img = `data:image/png;base64,${result.image}`;
      doc.addImage(img, "PNG", 20, 130, 170, 100);  // Image section
    }

    // Footer Section
    const date = new Date().toLocaleDateString();
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
    doc.text(`Report Generated On: ${date}`, 20, 250);

    doc.text(`Page: ${doc.internal.getNumberOfPages()}`, 180, 250);

    // Save the PDF
    doc.save("prediction_report.pdf");
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPatientDetails((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = () => {
    setShowForm(false);
    saveReportAsPDF();
  };

  return (
    <div className="container mx-auto px-6 py-8  bg-blue-50 to-blue-80 min-h-screen">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-xl p-8 border border-gray-300">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
          Medical Prediction Report
        </h1>

        {loading ? (
          <div className="text-center text-gray-600 text-2xl">Loading...</div>
        ) : result ? (
          <div>
            <div className="mb-6 p-6 bg-gray-100 border-t-4 border-indigo-600 rounded-lg">
              <h2 className="text-2xl font-semibold text-gray-800">Tumor Detection Status:</h2>
              {result.tumor_detected ? (
                <p className="text-3xl text-red-600 font-semibold">Tumor Detected</p>
              ) : (
                <p className="text-3xl text-green-600 font-semibold">No Tumor Detected</p>
              )}
            </div>

            <div className="mb-6">
              <h3 className="text-xl font-semibold text-gray-800">Additional Information</h3>
              <p><strong className="font-medium text-gray-700">Size:</strong> {result.size || "N/A"}</p>
              <p><strong className="font-medium text-gray-700">Location:</strong> {result.location || "N/A"}</p>
            </div>

            {result.image && (
              <div className="mb-8">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Result Image</h3>
                <div className="flex justify-center space-x-8">
                  <div className="w-1/2">
                    <img
                      src={`data:image/png;base64,${result.image}`}
                      alt="Result"
                      className="rounded-lg shadow-lg w-full h-auto object-cover"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        ) : (
          <p className="text-center text-gray-600 text-xl">No report generated yet.</p>
        )}

        {!showForm && (
          <div className="flex justify-center mt-8">
            <button
              className="bg-blue-600 text-white py-3 px-8 rounded-lg hover:bg-blue-700 transition focus:outline-none focus:ring-2 focus:ring-blue-500"
              onClick={() => setShowForm(true)}
            >
              Save Report as PDF
            </button>
          </div>
        )}

        {showForm && (
          <div className="mt-8 p-6 bg-gray-100 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Enter Patient Details</h2>
            <form onSubmit={(e) => e.preventDefault()}>
              <div className="mb-4">
                <label className="block text-lg text-gray-700">Name</label>
                <input
                  type="text"
                  name="name"
                  value={patientDetails.name}
                  onChange={handleInputChange}
                  className="w-full p-3 rounded-lg border border-gray-300 mt-2"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-lg text-gray-700">Age</label>
                <input
                  type="number"
                  name="age"
                  value={patientDetails.age}
                  onChange={handleInputChange}
                  className="w-full p-3 rounded-lg border border-gray-300 mt-2"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-lg text-gray-700">Gender</label>
                <select
                  name="gender"
                  value={patientDetails.gender}
                  onChange={handleInputChange}
                  className="w-full p-3 rounded-lg border border-gray-300 mt-2"
                  required
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-lg text-gray-700">Blood Group</label>
                <input
                  type="text"
                  name="bloodGroup"
                  value={patientDetails.bloodGroup}
                  onChange={handleInputChange}
                  className="w-full p-3 rounded-lg border border-gray-300 mt-2"
                  required
                />
              </div>

              <div className="flex justify-center mt-8">
                <button
                  className="bg-blue-600 text-white py-3 px-8 rounded-lg hover:bg-blue-700 transition focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onClick={handleSubmit}
                >
                  Generate PDF
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

export default Report;
