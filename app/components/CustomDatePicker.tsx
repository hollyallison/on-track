import React, { useState } from 'react';
import ReactDatePicker from 'react-datepicker'; // Renamed import
import 'react-datepicker/dist/react-datepicker.css';


interface CustomDatePickerProps {
  onChange: (date: Date | null) => void;
  selectedDate: Date;
}

const CustomDatePicker: React.FC<CustomDatePickerProps> = ({ onChange, selectedDate }) => {
  return (
    <ReactDatePicker
      selected={selectedDate}
      onChange={onChange} // This now accepts a function that handles both Date and null
      dateFormat="dd/MM/yyyy"
    />
  );
};

export default CustomDatePicker;


