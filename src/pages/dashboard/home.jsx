import React, { useEffect, useState } from "react";
import UploadCtScan from './UploadCtScan';
import axios from 'axios';
import jwtDecode from 'jwt-decode';

function getCurrentMonthYear() {
  const date = new Date();
  const options = { month: 'long', year: 'numeric' };
  return date.toLocaleDateString(undefined, options);
}

// const selectedDay = 'Monday'; // Set the selected day as needed

export function Home() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [doctorId, setDoctorId] = useState(null);

  // Fetch doctor ID from token
  useEffect(() => {
    const fetchDoctorIdFromToken = () => {
      try {
        const token = localStorage.getItem("token"); // Adjust this according to your token storage
        if (token) {
          const decoded = jwtDecode(token);
          setDoctorId(decoded?.id); // Assuming the token contains `id` as doctor ID
        } else {
          setError("Token not found. Please log in again.");
          setLoading(false);
        }
      } catch (err) {
        setError("Failed to decode token.");
        setLoading(false);
      }
    };

    fetchDoctorIdFromToken();
  }, []);

  // Fetch appointments when doctorId is available
  useEffect(() => {
    const fetchAppointments = async () => {
      if (!doctorId) return;

      try {
        const response = await axios.get(`http://localhost:5001/api/appointments/${doctorId}`);
        const acceptedAppointments = response.data.filter(appointment => appointment.status === "accepted");
        setAppointments(acceptedAppointments); // Set fetched accepted appointments to state
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch appointments.");
        setLoading(false);
      }
    };

    fetchAppointments();
  }, [doctorId]); // Re-fetch appointments if doctorId changes

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="mt-8 flex justify-between space-x-6 item-center"> {/* Adjusted space between divs */}
      {/* Left side - Time filter and Appointments */}
      <div className="p-6 bg-white shadow-md rounded-lg w-[70%] mx-auto"> {/* Adjusted width */}
        <div className="mb-6 flex flex-col items-center">
          <div className="mb-4">
            <h2 className="text-2xl font-bold text-gray-800">Upcoming Appointments</h2>
          </div>
          <div className="flex items-center mt-2">
            <img  
              src="/img/assets/calender.png"
              alt="Calendar"
              className="w-8 h-8 mr-2"
            />
            <span className="text-lg font-semibold text-gray-600">
              {getCurrentMonthYear()}
            </span>
          </div>
        </div>
        <div className="space-y-4 overflow-y-auto max-w-screen-lg mx-auto">
          {appointments.map((appointment) => (
            <div key={appointment._id} className="flex flex-col p-4 bg-gray-100 rounded-lg shadow-sm">
              <div className="flex items-center">
                <div className="mr-4">
                  <img className="w-16 h-16 rounded-full" src="/img/assets/per.png" alt="Person Image" />
                </div>
                <div className="flex flex-col">
                  <div className="flex items-center mb-2">
                    <span className="font-bold">{appointment.time}</span>
                  </div>
                  <p className="font-semibold">{appointment.name}</p>
                  <p className="text-sm text-gray-500">{appointment.message}</p>
                </div>
              </div>
              <div className="mt-4 flex justify-between">
                <button className="flex items-center px-4 py-2 rounded-lg text-white bg-blue-500">
                  <img src="/img/assets/chat.png" alt="Chat" className="w-5 h-5 mr-2" /> Chat
                </button>
                <button className="flex items-center px-4 py-2 rounded-lg text-white bg-red-500">
                  <img src="/img/assets/cancel.png" alt="Cancel" className="w-5 h-5 mr-2" /> Cancel
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-4">
          <button className="text-blue-500 hover:underline">See All</button>
        </div>
      </div>

    
    </div>
  );
}


export default Home;
