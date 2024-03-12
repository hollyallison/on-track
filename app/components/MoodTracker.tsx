import React, { useState } from 'react';

const MoodTracker = () => {
  const [selectedMoods, setSelectedMoods] = useState([]);
  const moods = [
    { id: 'motivated', emoji: '💪', label: 'Motivated' },
    { id: 'productive', emoji: '🚀', label: 'Productive' },
    { id: 'focused', emoji: '🎯', label: 'Focused' },
    { id: 'distracted', emoji: '🤹‍♂️', label: 'Distracted' },
    { id: 'apathetic', emoji: '😑', label: 'Apathetic' },
    { id: 'overwhelmed', emoji: '😵', label: 'Overwhelmed' },
    { id: 'relaxed', emoji: '🧘', label: 'Relaxed' },
    { id: 'joyful', emoji: '😊', label: 'Joyful' },
    { id: 'anxious', emoji: '😰', label: 'Anxious' },
    { id: 'sad', emoji: '😢', label: 'Sad' }
  ];
  
  const toggleMood = (mood) => {
    setSelectedMoods(prevSelectedMoods =>
      prevSelectedMoods.includes(mood) ? prevSelectedMoods.filter(m => m !== mood) : [...prevSelectedMoods, mood]
    );
  };

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">How are you feeling today?</h2>
      {/* Grid container for moods */}
      <div className="grid grid-cols-5 gap-4">
        {moods.map(mood => (
          <button
            key={mood.id}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium border-2 ${selectedMoods.includes(mood.id) ? 'border-indigo-500 bg-indigo-100' : 'border-gray-300'}`}
            onClick={() => toggleMood(mood.id)}
          >
            <span>{mood.emoji}</span>
            <span>{mood.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default MoodTracker;
