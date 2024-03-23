import React, { useState } from 'react';
import axios from 'axios';
import ActionButtons from './ActionButtons';

interface GratitudeProps {
  selectedDate: Date;
}

const Gratitude: React.FC<GratitudeProps> = ({ selectedDate }) => {
  const [gratitudeText, setGratitudeText] = useState('');

  const handleGratitudeSave = async () => {
    try {
      const payload = {
        date: selectedDate.toISOString(),
        items: gratitudeText.split('\n').filter(line => line.trim() !== ''),
      };
      const response = await axios.post('/api/Gratitudes', payload, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log('Gratitude submission successful', response.data);
      setGratitudeText('');
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Failed to submit Gratitude:', error.response?.data || error.message);
      } else {
        console.error('Unexpected error:', error);
      }
    }
  };

  const handleCancel = () => {
    setGratitudeText('');
  };

  return (
    <div>
      <h1 className="text-2xl font-semibold text-gray-900">Gratitude List</h1>
      <textarea
        value={gratitudeText}
        onChange={(e) => setGratitudeText(e.target.value)}
        className="w-full p-4 text-gray-700 bg-white border border-gray-200 rounded-md shadow-sm"
        rows={4}
        placeholder="I am so truly grateful for..."
      />
      <ActionButtons onSave={handleGratitudeSave} onCancel={handleCancel} />
    </div>
  );
};

export default Gratitude;
