// components/DailyPractice.tsx

import React from 'react';

const DailyPractice: React.FC = () => {
  return (
    <div className="p-4 border rounded-lg shadow-sm">
      <h2 className="text-xl font-semibold mb-2">Daily Practice</h2>
      <textarea
        className="w-full p-2 border rounded-md"
        placeholder="What are you grateful for today?"
      />
    </div>
  );
};

export default DailyPractice;
