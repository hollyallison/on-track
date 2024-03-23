
"use client"
import React, { useState } from 'react';
import Gratitude from '../../components/Gratitude';
import PhotoUpload from '../../components/PhotoUpload';
import DailyReflections from '../../components/DailyReflections';
import MoodTracker from '../../components/MoodTracker';
import CustomDatePicker from '../../components/CustomDatePicker';
import ActionButtons from '@/app/components/ActionButtons';



 export default function DailyPractice() { 
  const handleDateChange = (selectedDate: Date | null): void => {
    if (selectedDate) {
      setSelectedDate(selectedDate);
    }
  };
const [selectedDate, setSelectedDate] = useState(new Date());


  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen lg:px-14">
        <div className="w-full max-w-4xl p-12 bg-white rounded-lg shadow-2xl">
        <Gratitude selectedDate={selectedDate} />
        <CustomDatePicker onChange={handleDateChange} selectedDate={selectedDate} />
        </div>
      </div>

      <div className="flex flex-col items-center justify-center min-h-screen lg:px-14">
        <div className="w-full max-w-4xl p-12 bg-white rounded-lg shadow-2xl">
          <PhotoUpload />
          <DailyReflections />
          <MoodTracker />
          <CustomDatePicker onChange={handleDateChange} selectedDate={selectedDate} />
          <ActionButtons />
        </div>
      </div>
    </>
  );
}