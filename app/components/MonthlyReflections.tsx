import React from 'react';

const MonthlyReflection: React.FC = () => {
  return (
    <div className="p-4 border rounded-lg shadow-sm">
      
      <h2 className="text-xl font-semibold mb-2">Monthly Reflections</h2>
      <div className="space-y-4">
        <div>
          <label htmlFor="successes" className="block mb-1">What successes have I achieved recently?
          </label>
          <input type="text" id="successes" className="w-full p-2 border rounded-md" />
        </div>
        <div>
          <label htmlFor="improvements" className="block mb-1">What lessons have I learned?
          </label>
          <input type="text" id="improvements" className="w-full p-2 border rounded-md" />
        </div>
        <div>
          <label htmlFor="improvements" className="block mb-1">How am I feeling about my process?
          </label>
          <input type="text" id="improvements" className="w-full p-2 border rounded-md" />
        </div>
      </div>

      <h2 className="text-xl font-semibold mb-2">Plan for Month Ahead</h2>
      <div className="space-y-4">
        <div>
          <label htmlFor="successes" className="block mb-1">What milestones am I going to work on this month?
          </label>
          <input type="text" id="successes" className="w-full p-2 border rounded-md" />
        </div>
        <div>
          <label htmlFor="improvements" className="block mb-1">What are the key actions needed to achieve these?
          </label>
          <input type="text" id="improvements" className="w-full p-2 border rounded-md" />
        </div>
        <div>
          <label htmlFor="improvements" className="block mb-1">How will I measure my progress?
          </label>
          <input type="text" id="improvements" className="w-full p-2 border rounded-md" />
        </div>
      </div>
    </div>

    
  );
};

export default MonthlyReflection;

