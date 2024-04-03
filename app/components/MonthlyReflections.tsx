import React, { useState, FormEvent } from 'react';
import axios from 'axios';
import CustomDatePicker from './CustomDatePicker';
import ActionButtons from './ActionButtons';

type ReflectionsState = {
  [key: string]: string;
};

const reflectionQuestions = [
  { title: 'What successes have I achieved recently?', key: 'successes', type: 'Monthly' },
  { title: 'What lessons have I learned?', key: 'lessons', type: 'Monthly'},
  { title: 'How am I feeling about my process?', key: 'feelings', type: 'Monthly'},
  { title: 'What milestones am I going to work on this month?', key: 'milestones', type: 'Monthly'},
  { title: 'What are the key actions needed to achieve these?', key: 'actions', type: 'Monthly'},
  { title: 'How will I measure my progress?', key: 'measurement', type: 'Monthly'},
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
      date: date.toISOString(),
      type: "Monthly", 
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
      //  add feedback mechanism - show it's been updated)
    } catch (error) {
      console.log('Reflection submission successful');
      console.error('Failed to submit reflection:', error);
      //  add feedback mechanism - an error/unsuccessful message)
    }
  };

  const handleSave = async () => {
    await submitReflection();
 // link to where the informationis being stored 
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

export default MonthlyReflection;
