import React from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './Calendar.css'

const CalendarCard: React.FC = () => {
  const today = new Date();

  return (
    <div className="bg-blue hover:bg-gray-500 p-4 rounded-lg shadow max-w-110 ">
      <h2 className="text-lg font-bold mb-2 text-white">Calendar</h2>
      <Calendar value={today}
        tileClassName={({ date, view }) => {
          if (date.toDateString() === new Date().toDateString()) {
            return 'bg-lightPink text-white'; // Current date
          }
          return 'text-white'; // Default dates
        }}
       />
       
    </div>
  );
};

export default CalendarCard;
