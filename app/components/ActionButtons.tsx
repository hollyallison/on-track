import React from 'react'

interface ActionButtonsProps {
  onSave: () => void;
  onCancel: () => void;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({ onSave, onCancel }) => {
  return (
    <div className="flex justify-end mt-4">
      <button
        type="button"
        onClick={onCancel}
        className="text-sm text-gray-600 hover:text-indigo-600 mr-4"
      >
        Cancel
      </button>
      <button
        type="button"
        onClick={onSave}
        className="rounded-md bg-indigo-600 px-4 py-2 text-sm text-white hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2"
      >
        Save
      </button>
    </div>
  );
};
      export default ActionButtons