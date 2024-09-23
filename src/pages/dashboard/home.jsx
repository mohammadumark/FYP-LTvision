import React from "react";
import UploadCtScan from './UploadCtScan';

function getCurrentMonthYear() {
  const date = new Date();
  const options = { month: 'long', year: 'numeric' };
  return date.toLocaleDateString(undefined, options);
}

function handleDayClick(day) {
  console.log(day);
}

const selectedDay = 'Monday'; // Set the selected day as needed

export function Home() {
  return (
    <div className="mt-12 flex justify-between">
      {/* Left side - Time filter and Appointments */}
      <div className="flex space-x-4">
        {/* Time Filter */}
        <div className="p-6 bg-white shadow-md rounded-lg w-32">
          <div className="text-center font-bold text-gray-700 mb-4">
            <h2 className="text-xl">Mon 1</h2>
          </div>
          <div className="space-y-2">
            {['3:00pm', '3:30pm', '4:00pm', '4:30pm', '5:00pm', '5:30pm', '6:00pm'].map(time => (
              <div
                key={time}
                className="cursor-pointer p-2 bg-red-300 text-white text-center rounded-lg hover:bg-red-400 transition-colors"
              >
                {time}
              </div>
            ))}
          </div>
        </div>

        {/* Appointments */}
        <div className="p-6 bg-white shadow-md rounded-lg w-80">
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
          <div className="grid grid-cols-6 gap-2 mb-4">
            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day, index) => (
              <div
                key={day}
                className={`cursor-pointer p-2 text-center rounded-lg hover:bg-gray-100 transition-colors ${
                  selectedDay === day ? 'bg-blue-500 text-white' : 'bg-gray-200'
                }`}
                onClick={() => handleDayClick(day)}
              >
                <div>{day}</div>
                <div className="text-xs text-gray-700">{index + 1}</div>
              </div>
            ))}
          </div>
          <div className="space-y-4 h-80 overflow-y-auto">
            {[...Array(3)].map((_, index) => (
              <div key={index} className="flex flex-col p-4 bg-gray-100 rounded-lg shadow-sm">
                <div className="flex items-center">
                  <div className="mr-4">
                    <img className="w-16 h-16 rounded-full" src="/img/assets/per.png" alt="Person Image" />
                  </div>
                  <div className="flex flex-col">
                    <div className="flex items-center mb-2">
                      <span className="font-bold">5:00 PM</span>
                    </div>
                    <p className="font-semibold">Arslan Khan</p>
                    <p className="text-sm text-gray-500">Liver Swelling</p>
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

      {/* Right side - CT Scan Upload */}
      <div className="p-6 bg-white shadow-md rounded-lg w-2/5">
        <UploadCtScan />
      </div>
    </div>
  );
}

export default Home;
