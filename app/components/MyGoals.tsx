"use client"
import React, { useState } from 'react';

interface Milestone {
  description: string;
  deadline: string;
  completed: boolean;
}

const MyGoals: React.FC = () => {
  const [goal, setGoal] = useState('');
  const [milestones, setMilestones] = useState<Milestone[]>([]);
  const [currentMilestone, setCurrentMilestone] = useState('');
  const [milestoneDeadline, setMilestoneDeadline] = useState('');
  const [isEditMode, setIsEditMode] = useState(true);

  const handleGoalChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGoal(e.target.value);
  };

  const handleMilestoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentMilestone(e.target.value);
  };

  const handleDeadlineChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMilestoneDeadline(e.target.value);
  };

  const handleAddMilestone = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentMilestone.trim() || !milestoneDeadline) return;
    setMilestones([...milestones, { description: currentMilestone, deadline: milestoneDeadline }]);
    setCurrentMilestone('');
    setMilestoneDeadline('');
  };

  const toggleEditMode = () => {
    setIsEditMode(!isEditMode);
  };
  // Toggle the completion status of a milestone
  const toggleMilestoneCompletion = (index: number) => {
    const newMilestones = milestones.map((milestone, i) => {
      if (i === index) {
        return { ...milestone, completed: !milestone.completed };
      }
      return milestone;
    });
    setMilestones(newMilestones);
  };

  // Delete a milestone
  const deleteMilestone = (index: number) => {
    const newMilestones = milestones.filter((_, i) => i !== index);
    setMilestones(newMilestones);
  };

  return (
    <div className="antialiased bg-slate-200 text-slate-700 mx-2">
      <div className="max-w-lg mx-auto my-10 bg-white p-8 rounded-xl shadow shadow-slate-300">
        {/* Always visible goal and milestones */}
        <h1 className="text-xl font-bold mb-4">{goal || "Your Goal"}</h1>
        <ul>
          {milestones.map((milestone, index) => (
            <li key={index} className="flex justify-between items-center border-b border-slate-200 py-2">
              <span>{milestone.description}</span>
              <span className="text-sm text-slate-500">{milestone.deadline}</span>
            </li>
          ))}
        </ul>

        {isEditMode && (
          <>
            <input
              className="border border-slate-300 p-2 w-full rounded my-2"
              type="text"
              placeholder="Set your goal"
              value={goal}
              onChange={handleGoalChange}
            />
            <form onSubmit={handleAddMilestone} className="flex flex-col gap-2">
              <input
                className="border border-slate-300 p-2 rounded"
                type="text"
                placeholder="Add a milestone"
                value={currentMilestone}
                onChange={handleMilestoneChange}
              />
              <input
                className="border border-slate-300 p-2 rounded"
                type="date"
                value={milestoneDeadline}
                onChange={handleDeadlineChange}
              />
              <button className="p-2 bg-blue-500 text-white rounded" type="submit">Add Milestone</button>
            </form>
          </>
        )}

<ul>
          {milestones.map((milestone, index) => (
            <li key={index} className={`flex justify-between items-center border-b border-slate-200 py-2 ${milestone.completed ? 'text-green-500' : ''}`}>
              <div>
                <span className="mr-2">{milestone.description}</span>
                <span className="text-sm text-slate-500">{milestone.deadline}</span>
              </div>
              <div className="flex items-center">
                <button onClick={() => toggleMilestoneCompletion(index)} className="mr-2 p-1 bg-blue-500 text-white rounded">
                  {milestone.completed ? 'Unmark' : 'Complete'}
                </button>
                <button onClick={() => deleteMilestone(index)} className="p-1 bg-red-500 text-white rounded">
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>

        <button onClick={() => setIsEditMode(!isEditMode)} className="mt-4 p-2 bg-blue-500 text-white rounded">
          {isEditMode ? "Finish Editing" : "Edit"}
        </button>
      </div>
    </div>
  );
};

export default MyGoals;
