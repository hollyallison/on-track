import React, { useState, FormEvent } from 'react';
import axios from 'axios';
import CustomDatePicker from './CustomDatePicker';
import ActionButtons from './ActionButtons';

type ReflectionsState = {
  [key: string]: string;
};

const reflectionQuestions = [
  { title: 'Achievements and Progress', key: 'progess' , type: 'Quartetly'},
  { title: 'Challenges and Solutions', key: 'challenges' , type: 'Quartetly'},
  {title: 'Goal Alignment' , key: 'alignment', type: 'Quartetly'},
  {title: 'Motivation and Morale' , key: 'motivation', type: 'Quartetly'},
  {title: 'Looking ahead' , key: 'lookingAhead', type: 'Quartetly'},
];

const QuarterlyReflection: React.FC = () => {
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
      date: date.toISOString(),
      type: "Quarterly", 
      questions: Object.keys(reflections).map((key) => ({
        key: key,
        title: reflectionQuestions.find((q) => q.key === key)?.title || '',
        text: reflections[key],
      })),
    };
  
    try {
      await axios.post('/api/Reflections', payload, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      // Consider adding a success feedback mechanism here (e.g., a success message to the user)
    } catch (error) {
      console.log('Reflection submission successful');
      console.error('Failed to submit reflection:', error);
      // Consider adding an error feedback mechanism here (e.g., an error message to the user)
    }
  };

  const handleSave = async () => {
    await submitReflection();
    // Implement additional logic if needed upon successful save, such as redirecting the user or showing a success message
  };

  const handleCancel = () => {
    console.log('Cancel action triggered');
    setReflections(reflectionQuestions.reduce((acc: ReflectionsState, question) => {
      acc[question.key] = '';
      return acc;
    }, {}));
    setDate(new Date());
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await handleSave();
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

export default QuarterlyReflection;
