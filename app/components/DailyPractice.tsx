"use client"
import MoodTracker from './../components/MoodTracker';
import ActionButtons from './../components/ActionButtons';
import Gratitude from './../components/Gratitude';
import DailyReflections from './../components/DailyReflections';
import PhotoUpload from './../components/PhotoUpload';

export default function DailyPractice() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start w-full max-w-4xl p-8 bg-white rounded-lg shadow-xl">
      {/* PhotoUpload and Gratitude in the same row will have equal height automatically */}
      <div className="flex flex-col md:col-span-1">
        <PhotoUpload />
      </div>
      
      <div className="flex flex-col md:col-span-1">
        <Gratitude />
      </div>

        {/* Full-width for Daily Reflections */}
        <div className="md:col-span-2">
          <DailyReflections />
        </div>

        {/* Full-width for MoodTracker */}
        <div className="md:col-span-2">
          <MoodTracker />
        </div>

        {/* ActionButtons */}
        <div className="md:col-span-2 flex justify-end">
          <ActionButtons />
        </div>
      </div>
  );
}
