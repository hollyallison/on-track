import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'; // Import the CSS


const MyComponent: React.FC = () => {
 
  const [startDate, setStartDate] = useState<Date | null>(new Date());
  const handleChange = (date: Date | null): void => {
    setStartDate(date);
  };

  return (
    <DatePicker
      selected={startDate}
      onChange={handleChange}
      dateFormat="dd/MM/yyyy"
    />
  );
};

export default MyComponent;

