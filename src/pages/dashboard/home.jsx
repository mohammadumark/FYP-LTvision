import React, { useEffect, useState } from "react";
import axios from 'axios';
import jwtDecode from 'jwt-decode';

function getCurrentMonthYear() {
  const date = new Date();
  const options = { month: 'long', year: 'numeric' };
  return date.toLocaleDateString(undefined, options);
}

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
        const currentDate = new Date();
        
        // Filter appointments to include only "accepted" and with a date in the future or today
        const filteredAppointments = response.data.filter(appointment => {
          const appointmentDate = new Date(appointment.date); // Assuming `date` is in a valid format
          return appointment.status === "accepted" && appointmentDate >= currentDate;
        });
        
        setAppointments(filteredAppointments); // Set filtered appointments to state
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
                  <img
                    src="/img/assets/time.png" // Replace with the actual path to the time icon
                    alt="Time Icon"
                    className="w-6 h-6"
                  />
                </div>
                <div className="flex flex-col">
                  <div className="flex items-center mb-2">
                    <span className="font-bold">{appointment.time}</span>
                    <span className="ml-4 text-sm text-gray-600">{appointment.date}</span> {/* Display date next to time */}
                  </div>
                  <p className="font-semibold">Patient Name: {appointment.name}</p>
                  <p className="text-sm text-gray-500">Appointment Message: {appointment.message}</p>
                </div>
              </div>
              <div className="mt-4 flex justify-between">
                {/* Additional buttons or actions can be added here */}
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-4">
          {/* Optional see all button */}
        </div>
      </div>
    </div>
  );
}

export default Home;
