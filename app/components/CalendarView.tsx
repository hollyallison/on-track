"use client"
import React, { useState } from 'react';
import Modal from '../components/Modal';
import DailyPractice from './DailyPractice';
import MonthlyReflection from './MonthlyReflections';

const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const Calendar: React.FC = () => {
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [content, setContent] = useState('default'); // Use this state to control content

  const openModal = (day: number) => {
    setSelectedDay(day);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setContent('default'); // Reset content state on modal close if needed
  };
  const renderHeader = () => (
    <div className="grid grid-cols-7 text-center font-medium text-sm">
      {daysOfWeek.map((day) => (
        <div key={day}>{day}</div>
      ))}
    </div>
  );

  const renderDays = () => (
    <div className="grid grid-cols-7 text-center">
      {[...Array(30).keys()].map((day) => (
        <div key={day} className="py-2 cursor-pointer" onClick={() => openModal(day + 1)}>
          {day + 1}
        </div>
      ))}
    </div>
  );
  const renderModalContent = () => (
    <div>
      <button onClick={() => { setContent('daily'); closeModal(); }}>Daily Practice</button>
      <button onClick={() => { setContent('monthly'); closeModal(); }}>Monthly Reflection</button>
    </div>
  );

  return (
    <div className="border border-gray-200 rounded-lg">
      {renderHeader()}
      {renderDays()}
      <Modal isOpen={modalIsOpen} onRequestClose={closeModal}>
        {renderModalContent()}
      </Modal>
      {content === 'daily' && <DailyPractice />}
      {content === 'monthly' && <MonthlyReflection />}
    </div>
  );
};

export default Calendar;




