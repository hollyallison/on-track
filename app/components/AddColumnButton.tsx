// AddTaskButton.js
import React from 'react';
import PlusIcon from '../icons/PlusIcon'; // Ensure PlusIcon is correctly imported

function AddTaskButton({ onAddColumn }) {
    return (
        <div>
            <button 
                onClick={onAddColumn} 
                className="hover:bg-sky-300 text-black font-bold py-2 px-4 rounded inline-flex items-center"
            >
                <PlusIcon/>
                <span className="pl-1"> Add Column</span>
            </button>
        </div> 
    );
}

export default AddTaskButton;
