
// components/Calendar.tsx
import React from 'react';

const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const Calendar: React.FC = () => {
  const renderHeader = () => (
    <div className="grid grid-cols-7 text-center font-medium text-sm">
      {daysOfWeek.map((day) => (
        <div key={day}>{day}</div>
      ))}
    </div>
  );

  // Placeholder for actual dates
  const renderDays = () => (
    <div className="grid grid-cols-7 text-center">
      {/* Example placeholders for days */}
      {[...Array(30).keys()].map((day) => (
        <div key={day} className="py-2">
          {day + 1}
        </div>
      ))}
    </div>
  );

  return (
    <div className="border border-gray-200 rounded-lg">
      {renderHeader()}
      {renderDays()}
    </div>
  );
};

export default Calendar;
