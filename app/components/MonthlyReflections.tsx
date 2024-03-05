// components/MonthlyReflection.tsx

import React from 'react';

const MonthlyReflection: React.FC = () => {
  return (
    <div className="p-4 border rounded-lg shadow-sm">
      <h2 className="text-xl font-semibold mb-2">Monthly Reflections</h2>
      <div className="space-y-4">
        <div>
          <label htmlFor="successes" className="block mb-1">What successes have I achieved?</label>
          <input type="text" id="successes" className="w-full p-2 border rounded-md" />
        </div>
        <div>
          <label htmlFor="improvements" className="block mb-1">What could be improved?</label>
          <input type="text" id="improvements" className="w-full p-2 border rounded-md" />
        </div>
        {/* Additional questions as needed */}
      </div>
    </div>
  );
};

export default MonthlyReflection;

