import React from 'react';
import ActionButtons from './ActionButtons';
import DatePicker from './DatePicker';

const QuarterlyReflection: React.FC = () => {
  return (
    <div className="p-6 bg-blue-50 border rounded-lg shadow-sm">
      
      <h2 className="text-2xl font-semibold text-gray-700 mb-4">Quarterly Reflections</h2>
      <div className="space-y-6">
        <div>
          <label htmlFor="progress" className="block text-lg font-medium text-gray-700 mb-2">Achievements and Progress</label>
          <p> Think about..  key accomplishments, how these align with you goals. Any new skill or knowledge you have gained. Time management: any milestones that took longer than expected?</p>
          <textarea id="progress" className="w-full p-4 text-gray-700 bg-white border border-gray-200 rounded-md" rows={4} />
        </div>
        <div>
          <label htmlFor="challenges" className="block text-lg font-medium text-gray-700 mb-2">Challenges and Solutions</label>
          <p> Think about.. did you face any challeges? how did you overcome these. Are there any unresolved challenges that a new approach?</p>
          <textarea id="challenges" className="w-full p-4 text-gray-700 bg-white border border-gray-200 rounded-md" rows={4} />
        </div>
        <div>
          <label htmlFor="Alignment" className="block text-lg font-medium text-gray-700 mb-2">Goal Alignment</label>
          <p> Think about.. are the goals i set still relevant? Do you need to change any. Do your current goals reflect your priorities. Has anything new shifted your focus?</p>
          <textarea id="Alignment" className="w-full p-4 text-gray-700 bg-white border border-gray-200 rounded-md" rows={4} />
        </div>
        <div>
          <label htmlFor="motivation" className="block text-lg font-medium text-gray-700 mb-2">Motivation and Morale</label>
          <p> What has kept you motivated or caused loss of motivation, how to maintain/improve this going forward</p>
          <textarea id="motivation" className="w-full p-4 text-gray-700 bg-white border border-gray-200 rounded-md" rows={4} />
        </div>
        <div>
          <label htmlFor="lookingAhead" className="block text-lg font-medium text-gray-700 mb-2">Looking ahead</label>
          <p>What goals and milestones are your priority going forward? What steps do you need to take to ensure you are on track?</p>
          <textarea id="lookingAhead" className="w-full p-4 text-gray-700 bg-white border border-gray-200 rounded-md" rows={4} />
        </div>
      </div>
       <DatePicker />
       <ActionButtons />
        </div>
      
    
  );
};

export default QuarterlyReflection;
