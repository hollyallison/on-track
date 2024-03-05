// components/MyGoals.tsx

import React from 'react';

const MyGoals: React.FC = () => {
  return (
    <div className="p-4 border rounded-lg shadow-sm">
      <h2 className="text-xl font-semibold mb-2">My Goals</h2>
      <div className="space-y-4">
        <div>
          <label htmlFor="goal" className="block mb-1">Main Goal</label>
          <input type="text" id="goal" className="w-full p-2 border rounded-md" />
        </div>
        <div>
          <label htmlFor="milestone" className="block mb-1">Milestone</label>
          <input type="text" id="milestone" className="w-full p-2 border rounded-md" />
        </div>
        {/* Additional inputs as needed */}
      </div>
    </div>
  );
};

export default MyGoals;

