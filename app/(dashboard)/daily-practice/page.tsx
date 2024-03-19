"use client"
import { useState } from 'react';
import Image from 'next/image'; // Import the Image component from next/image
import MoodTracker from '../../components/MoodTracker';
import ActionButtons from '../../components/ActionButtons';
import Gratitude from '../../components/Gratitude';
import DailyReflections from '../../components/DailyReflections';
import PhotoUpload from '../../components/PhotoUpload';
import DatePicker from '@/app/components/DatePicker';



export default function DailyPractice() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  return (
    <div className="flex flex-col items-center justify-center min-h-screen my-12 px-4 py-12 sm:px-12 lg:px-14">
      <div className="w-full max-w-4xl p-12 bg-white rounded-lg shadow-2xl">
        <h2
          className="col-span-full text-center text-7xl my-6 font-semibold"
          style={{
            backgroundImage: 'url("/images/dailypractice-header.jpg")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            padding: '65px 0',
            margin: '0 0 60px 0', // Adjust the margin as needed
            borderRadius: '80px',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
            opacity: '70%',
          }}
        >
          Daily Practice
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
          <div className="flex flex-col md:col-span-1">
            <PhotoUpload />
          </div>
          <div className="flex flex-col md:col-span-1">
            <Gratitude />
          </div>
          <div className="md:col-span-2">
            <DailyReflections />
          </div>
          <div className="md:col-span-2">
            <MoodTracker />
          </div>
          <div className="md:col-span-2 flex justify-end">
          <DatePicker />
          <ActionButtons />
          </div>
        </div>
      </div>
    </div>
  );
}
