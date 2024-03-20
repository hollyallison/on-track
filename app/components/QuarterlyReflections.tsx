import React, { useState , FormEvent } from 'react';
import axios from 'axios';
import CustomDatePicker from './CustomDatePicker';
import ActionButtons from './ActionButtons';

type ReflectionsState = {
  [key: string]: string;
};

const reflectionQuestions = [
  { title: 'Achievements and Progress', key: 'progess' },
  { title: 'Challenges and Solutions', key: 'challenges' },
  {title: 'Goal Alignment' , key: 'alignment'},
  {title: 'Motivation and Morale' , key: 'motivation'},
  {title: 'Looking ahead' , key: 'lookingAhead'},
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

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => { 
    e.preventDefault();
    const reflectionToSubmit = {
      date,
      type: 'Quarterly',
      questions: reflectionQuestions.map(question => ({
        key: question.key,
        title: question.title,
        text: reflections[question.key],
      }))
    };
  
    try {
      await axios.post('/api/reflections', reflectionToSubmit);
      // Handle success
    } catch (error) {
      // Handle error
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CustomDatePicker onChange={handleDateChange} selectedDate={date} />
      {reflectionQuestions.map(question => (
        <div key={question.key}>
          <label htmlFor={question.key} className="block text-lg font-medium text-gray-700 mb-2">{question.title}</label>
          <textarea id={question.key} value={reflections[question.key]} onChange={(e) => handleChange(question.key, e.target.value)} className="w-full p-4 text-gray-700 bg-white border border-gray-200 rounded-md" rows={4} />
        </div>
      ))}
     <ActionButtons />
    </form>
  );
};

export default QuarterlyReflection;
