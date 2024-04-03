import React from 'react';

function AddBoardButton({ onAddBoard }) {
  const handleAddBoard = () => {
    
    onAddBoard(""); 
  };

  return (
    <button onClick={handleAddBoard}>Add Goal</button>
  );
}

export default AddBoardButton;
