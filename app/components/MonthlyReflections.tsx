import React, { useState, FormEvent } from 'react';
import axios from 'axios';
import CustomDatePicker from './CustomDatePicker';

// Assuming ActionButtons is a functional component receiving onSave and onCancel as props
const ActionButtons = ({ onSave, onCancel }) => (
  <div className="mt-4">
    <button type="button" onClick={onSave} className="mr-2 p-2 bg-blue-500 text-white rounded">Save</button>
    <button type="button" onClick={onCancel} className="p-2 bg-gray-500 text-white rounded">Cancel</button>
  </div>
);

type ReflectionsState = {
  [key: string]: string;
};

const reflectionQuestions = [
  { title: 'What successes have I achieved recently?', key: 'successes' },
  { title: 'What lessons have I learned?', key: 'lessons' },
  { title: 'How am I feeling about my process?', key: 'feelings' },
  { title: 'What milestones am I going to work on this month?', key: 'milestones' },
  { title: 'What are the key actions needed to achieve these?', key: 'actions' },
  { title: 'How will I measure my progress?', key: 'measurement' },
];

const MonthlyReflection: React.FC = () => {
  const [reflections, setReflections] = useState<ReflectionsState>(reflectionQuestions.reduce((acc: ReflectionsState, question) => {
    acc[question.key] = '';
    return acc;
  }, {}));
  
  const [date, setDate] = useState<Date>(new Date());

  const handleDateChange = (selectedDate: Date | null): void => {
    if (selectedDate) {
      setDate(selectedDate);
    }
  };

  const handleChange = (key: string, value: string) => {
    setReflections(prev => ({ ...prev, [key]: value }));
  };

  const submitReflection = async () => {
    const payload = {
      date: date,
      reflections: Object.keys(reflections).map((key) => ({
        key: key,
        title: reflectionQuestions.find((q) => q.key === key)?.title || '',
        text: reflections[key],
      })),
    };
  
    try {
      await axios.post('/api/Reflections', payload);
      console.log('Reflection submitted successfully');
      // Here you might want to navigate the user to another page or clear the form
    } catch (error) {
      console.error('Failed to submit reflection:', error);
      // Error handling here
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await submitReflection();
  };

  const handleSave = async () => {
    await submitReflection();
  };

  const handleCancel = () => {
    console.log('Cancel action triggered');
    // Example reset (simplified):
    setReflections(reflectionQuestions.reduce((acc: ReflectionsState, question) => {
      acc[question.key] = '';
      return acc;
    }, {}));
    setDate(new Date()); // Reset date to current
  };

  return (
    <form onSubmit={handleSubmit}>
      <CustomDatePicker onChange={handleDateChange} selectedDate={date} />
      {reflectionQuestions.map(question => (
        <div key={question.key} className="mb-4">
          <label htmlFor={question.key} className="block text-lg font-medium text-gray-700 mb-2">{question.title}</label>
          <textarea id={question.key} value={reflections[question.key]} onChange={(e) => handleChange(question.key, e.target.value)} className="w-full p-4 text-gray-700 bg-white border border-gray-200 rounded-md" rows={4} />
        </div>
      ))}
      <ActionButtons onSave={handleSave} onCancel={handleCancel} />
    </form>
  );
};

export default MonthlyReflection;
