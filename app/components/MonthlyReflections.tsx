import React from 'react';
import ActionButtons from './ActionButtons';
import DatePicker from './DatePicker';

const MonthlyReflection: React.FC = () => {
  return (
    <div className="p-6 bg-blue-50 border rounded-lg shadow-sm">
      
      <h2 className="text-2xl font-semibold text-gray-700 mb-4">Monthly Reflections</h2>
      <div className="space-y-6">
        <div>
          <label htmlFor="successes" className="block text-lg font-medium text-gray-700 mb-2">What successes have I achieved recently?</label>
          <textarea id="successes" className="w-full p-4 text-gray-700 bg-white border border-gray-200 rounded-md" rows={4} />
        </div>
        <div>
          <label htmlFor="lessons" className="block text-lg font-medium text-gray-700 mb-2">What lessons have I learned?</label>
          <textarea id="lessons" className="w-full p-4 text-gray-700 bg-white border border-gray-200 rounded-md" rows={4} />
        </div>
        <div>
          <label htmlFor="feelings" className="block text-lg font-medium text-gray-700 mb-2">How am I feeling about my process?</label>
          <textarea id="feelings" className="w-full p-4 text-gray-700 bg-white border border-gray-200 rounded-md" rows={4} />
        </div>
      </div>

      <h2 className="text-2xl font-semibold text-gray-700 mb-4 mt-8">Plan for Month Ahead</h2>
      <div className="space-y-6">
        <div>
          <label htmlFor="milestones" className="block text-lg font-medium text-gray-700 mb-2">What milestones am I going to work on this month?</label>
          <textarea id="milestones" className="w-full p-4 text-gray-700 bg-white border border-gray-200 rounded-md" rows={4} />
        </div>
        <div>
          <label htmlFor="actions" className="block text-lg font-medium text-gray-700 mb-2">What are the key actions needed to achieve these?</label>
          <textarea id="actions" className="w-full p-4 text-gray-700 bg-white border border-gray-200 rounded-md" rows={4} />
        </div>
        <div>
          <label htmlFor="measurement" className="block text-lg font-medium text-gray-700 mb-2">How will I measure my progress?</label>
          <textarea id="measurement" className="w-full p-4 text-gray-700 bg-white border border-gray-200 rounded-md" rows={4} />
       <DatePicker />
       <ActionButtons />
        </div>
      </div>
    </div>
  );
};

export default MonthlyReflection;

