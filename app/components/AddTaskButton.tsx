// AddTaskButton.js
import React from 'react';
import PlusIcon from '../icons/PlusIcon'; // Ensure PlusIcon is correctly imported

function AddTaskButton({ onAdd }) {
    return (
        <div>
            <button 
                onClick={onAdd} 
                className="hover:bg-gray-200 text-black font-bold py-2 px-4 rounded inline-flex items-center"
            >
                <PlusIcon/>
                <span className="pl-1"> Add Milestone</span>
            </button>
        </div> 
    );
}

export default AddTaskButton;


