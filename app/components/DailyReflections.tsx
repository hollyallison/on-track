import React from 'react'


  const DailyReflections: React.FC = () => {
    return (
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-900">Daily Reflections</h2>
        <p className="mt-2 text-sm text-gray-600">
          Reflect on the day processes or something that made you laugh.
        </p>
        <textarea
          id="daily-reflections"
          rows={4}
          className="w-full mt-2 text-sm text-gray-900 placeholder-gray-400 bg-white border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          placeholder="Your reflections..."
        ></textarea>
      </div>
    ); }
  export default DailyReflections