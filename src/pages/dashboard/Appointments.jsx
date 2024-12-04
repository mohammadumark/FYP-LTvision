import React from "react";
import { FaCalendarAlt, FaComment, FaTimes, FaClock } from "react-icons/fa";

export function Appointment() {
  return (
    <div className="mt-12 mb-8 flex flex-col gap-12">
        <div className="bg-white w-full max-w-4xl rounded-lg shadow-lg p-6">
          {/* Header */}
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Upcoming Appointments</h2>
            <div className="flex items-center space-x-2">
              <FaCalendarAlt className="text-black" />
              <span className="font-semibold">November, 2024</span>
            </div>
          </div>

          {/* Days of the Week */}
          <div className="flex justify-between mb-4">
            {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day, index) => (
              <button
                key={index}
                className={`px-4 py-2 rounded-lg ${
                  index === 0 ? "bg-red-500 text-white" : "bg-gray-100 text-black"
                } font-medium`}
              >
                {day} {index + 1}
              </button>
            ))}
          </div>

          {/* Scrollable Appointment List */}
          <div className="flex">
            <div className="w-1/4 pr-4">
              {["3:00pm", "3:30pm", "4:00pm", "4:30pm", "5:00pm", "5:30pm", "6:00pm", "6:30pm"].map(
                (time, index) => (
                  <button
                    key={index}
                    className="w-full mb-2 px-4 py-2 bg-red-500 text-white rounded-lg font-semibold flex items-center justify-start"
                  >
                    <FaClock className="mr-2" />
                    {time}
                  </button>
                )
              )}
            </div>

            {/* Scrollable Appointments Container */}
            <div className="w-3/4 max-h-96 overflow-y-auto grid grid-cols-2 gap-4">
              {Array(20)
                .fill(0)
                .map((_, index) => (
                  <div
                    key={index}
                    className="flex items-start p-4 bg-white rounded-lg shadow-md space-x-4"
                  >
                    <img
                      src="https://via.placeholder.com/50"
                      alt="User"
                      className="w-12 h-12 rounded-full"
                    />
                    <div className="flex-1">
                      <div className="flex items-center text-lg font-semibold">
                        <FaClock className="mr-2 text-gray-600" />
                        6:00 pm
                      </div>
                      <div className="text-sm font-medium">Patient {index + 1}</div>
                      <div className="text-xs text-gray-500">Liver Swelling</div>
                      <div className="flex space-x-2 mt-2">
                        <button className="flex items-center space-x-1 text-blue-500">
                          <FaComment />
                          <span>Chat</span>
                        </button>
                        <button className="flex items-center space-x-1 text-red-500">
                          <FaTimes />
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
