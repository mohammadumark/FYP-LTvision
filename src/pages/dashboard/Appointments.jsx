import React, { useEffect, useState } from "react";
import { FaCalendarAlt, FaComment, FaTimes, FaClock, FaCheck, FaBan } from "react-icons/fa";
import axios from "axios";
import jwtDecode from "jwt-decode";

export function Appointment() {
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
        setAppointments(response.data); // Set fetched appointments to state
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch appointments.");
        setLoading(false);
      }
    };

    fetchAppointments();
  }, [doctorId]); // Re-fetch appointments if doctorId changes

  const updateAppointmentStatus = async (appointmentId, status) => {
    try {
      console.log(`Updating appointment ${appointmentId} to status ${status}`);
      const response = await axios.patch(
        `http://localhost:5001/api/appointments/${appointmentId}/status`,
        { status }
      );
      const updatedAppointment = response.data.appointment;
  
      console.log("Updated appointment:", updatedAppointment); // Debugging line
  
      setAppointments((prevAppointments) =>
        prevAppointments.map((appointment) =>
          appointment._id === appointmentId ? updatedAppointment : appointment
        )
      );
    } catch (err) {
      console.error("Failed to update appointment status:", err); // Debugging line
      setError("Failed to update appointment status.");
    }
  };
  

  const acceptAppointment = (appointmentId) => {
    updateAppointmentStatus(appointmentId, "accepted");
  };

  const cancelAppointment = (appointmentId) => {
    updateAppointmentStatus(appointmentId, "cancelled");
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="mt-12 mb-8 flex flex-col gap-12">
      <div className="bg-white w-full max-w-4xl rounded-lg shadow-lg p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Upcoming Appointments</h2>
          <div className="flex items-center space-x-2">
            <FaCalendarAlt className="text-black" />
            <span className="font-semibold">December, 2024</span>
          </div>
        </div>

        {/* Scrollable Appointment List */}
        <div className="flex">
          <div className="w-3/4 max-h-96 overflow-y-auto grid grid-cols-2 gap-4">
            {appointments.map((appointment) => (
              <div key={appointment._id} className="flex items-start p-4 bg-white rounded-lg shadow-md space-x-4">
                <img
                  src="https://via.placeholder.com/50"
                  alt="User"
                  className="w-12 h-12 rounded-full"
                />
                <div className="flex-1">
                  <div className="flex items-center text-lg font-semibold">
                    <FaClock className="mr-2 text-gray-600" />
                    {appointment.time}
                  </div>
                  <div className="text-sm font-medium">{appointment.name}</div>
                  <div className="text-xs text-gray-500">{appointment.message}</div>
                  <div className="flex space-x-2 mt-2">
                    <button
                      onClick={() => acceptAppointment(appointment._id)}
                      className="flex items-center space-x-1 text-green-500"
                    >
                      <FaCheck />
                      <span>Accept</span>
                    </button>
                    <button
                      onClick={() => cancelAppointment(appointment._id)}
                      className="flex items-center space-x-1 text-red-500"
                    >
                      <FaBan />
                      <span>Cancel</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Appointment;
