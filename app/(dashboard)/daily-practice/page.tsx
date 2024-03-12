"use client"
"use client";
import MoodTracker from '../../components/MoodTracker';
import ActionButtons from '../../components/ActionButtons';
import Gratitude from '../../components/Gratitude';
import DailyReflections from '../../components/DailyReflections';
import PhotoUpload from '../../components/PhotoUpload';


export default function DailyPractice() {
  return (
    <div className="flex justify-center items-center min-h-screen my-12"> {/* Ensures full viewport height and centers children */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start w-full max-w-4xl p-8 bg-white rounded-lg shadow-xl">
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
            <ActionButtons />
          </div>
        </div>
    </div>
  );
}

