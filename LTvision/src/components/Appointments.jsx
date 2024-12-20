import React, { useState } from 'react';
import Navbar from './Navbar';
import Navigation from './Navigation';
import './Navbar.css';
import './Appointment.css';

const Appointments = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedDay, setSelectedDay] = useState(null);

  const handleDayClick = (day) => {
    setSelectedDay(day);
  };

  const handleOptionClick = (option) => {
    setSelectedOption(option);
  };

  const getCurrentMonthYear = () => {
    const now = new Date();
    const month = now.toLocaleString('default', { month: 'long' });
    const year = now.getFullYear();
    return `${month} ${year}`;
  };

  return (
    <div className="home-container">
      <Navigation selectedOption={selectedOption} handleOptionClick={handleOptionClick} />
      <div className="main-content">
        <div className="inner-container">
          <div className="info">
            <div className="up">
              <h2>Upcoming Appointment</h2>
            </div>
            <div className="calendar">
              <img
                src="./assets/calendar.png"
                alt="Calendar"
                className="calendar-icon"
              />
              <span className="current-month-year">
                {getCurrentMonthYear()}
              </span>
            </div>
          </div>
          {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].map((day, index) => (
            <div
              key={day}
              className={`day-container ${selectedDay === day ? 'selected' : ''}`}
              onClick={() => handleDayClick(day)}
            >
              {day.slice(0, 3)}
              <br />
              {index + 1}
            </div>
          ))}
          <div className="app-details">
            <div className="day-time-container">
              {['9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM'].map(time => (
                <div key={time}>{time}</div>
              ))}
            </div>
            <div className="cards">
              {[...Array(3)].map((_, index) => (
                <div className="card" key={index}>
                  <div className="inner-div">
                    <div className="picture">
                      <img className="per" src="./src/assets/per.png" alt="Person Image" />
                    </div>
                    <div className="details">
                      <div className="time-container">
                        <img className="icon" src="./src/assets/time.png" alt="Time Icon" />
                        <span className="bold-text">10:00 AM</span>
                      </div>
                      <p className="bold-text2">John Doe</p>
                      <p className="bold-text">Liver Swelling</p>
                    </div>
                  </div>
                  <div className="buttons">
                    <button className="chat-button">
                      <img src="./src/assets/chat.png" alt="Chat" className="button-icon" /> Chat
                    </button>
                    <button className="cancel-button">
                      <img src="./src/assets/cancel.png" alt="Cancel" className="button-icon" /> Cancel
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Navbar />
    </div>
  );
};

export default Appointments;
