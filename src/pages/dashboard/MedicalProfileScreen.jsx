import React from 'react';

const MedicalProfileScreen = () => {
  return (
    <div className="p-4 bg-gray-50 min-h-screen flex flex-col items-center">
      {/* Main Container */}
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-4xl">
        {/* Header Section */}
        <div className="flex flex-col items-center mb-6">
          <img
            src="https://via.placeholder.com/100" // Placeholder for profile image
            alt="Profile"
            className="rounded-full w-24 h-24 mb-4"
          />
          <h2 className="text-2xl font-bold">Kumar Sharma</h2>
          <p>29 | 69kg | Male</p>
        </div>

        {/* Contact Section */}
        <div className="mb-6">
          <div className="flex justify-between gap-4">
            <div className="flex-1 bg-blue-100 p-3 rounded-lg shadow">
              <h3 className="font-bold">Contact</h3>
              <p>+92 3447836422</p>
            </div>
            <div className="flex-1 bg-blue-100 p-3 rounded-lg shadow">
              <h3 className="font-bold">Address</h3>
              <p>Phase 4, Iqbal</p>
            </div>
            <div className="flex-1 bg-blue-100 p-3 rounded-lg shadow">
              <h3 className="font-bold">Allergies</h3>
              <p>N/A</p>
            </div>
            <div className="flex-1 bg-blue-100 p-3 rounded-lg shadow">
              <h3 className="font-bold">Mail</h3>
              <p>kumar@email.com</p>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="flex flex-wrap gap-4">
          {/* Medical History */}
          <div className="w-full md:w-1/3 bg-gray-100 p-4 rounded-lg shadow">
            <h3 className="font-bold mb-2">Medical History</h3>
            <ul>
              <li className="mb-2">
                <span className="block font-semibold">March 07, 2024</span>
                Diet Education - Dr. Kumar Sharma
              </li>
              <li className="mb-2">
                <span className="block font-semibold">March 02, 2024</span>
                Chemotherapy - Dr. Kumar Sharma
              </li>
              <li className="mb-2">
                <span className="block font-semibold">February 01, 2024</span>
                Operative Biopsy - Dr. Kumar Sharma
              </li>
              <li>
                <span className="block font-semibold">January 03, 2024</span>
                Symptoms Analysis - Dr. Kumar Sharma
              </li>
            </ul>
          </div>

          {/* Diet Recommended */}
          <div className="w-full md:w-1/3 bg-gray-100 p-4 rounded-lg shadow">
            <h3 className="font-bold mb-2">Diet Recommended</h3>
            <div className="mb-4">
              <h4 className="font-semibold">What To Eat</h4>
              <ul className="list-disc pl-4">
                <li>Meat</li>
                <li>All Vegetables</li>
                <li>All Fruits</li>
                <li>Water (5+ daily)</li>
                <li>Eat Red Meat once a week</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold">What To Avoid</h4>
              <ul className="list-disc pl-4">
                <li>Wheat</li>
                <li>Spices</li>
                <li>Cooking Oil</li>
                <li>Chocolates</li>
              </ul>
            </div>
          </div>

          {/* Report Section */}
          <div className="w-full md:w-1/3 bg-gray-100 p-4 rounded-lg shadow">
            <h3 className="font-bold mb-2">Report</h3>
            <button className="w-full bg-red-500 text-white py-2 rounded-lg mb-4">Remove</button>
            <h4 className="font-semibold mb-1">Report Analysis</h4>
            <p>Diagnosed with stage I liver cancer.</p>
            <h4 className="font-semibold mt-4 mb-1">Treatment</h4>
            <p>Treatment in process.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MedicalProfileScreen;
