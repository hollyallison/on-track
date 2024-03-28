import React, { useState } from "react";
import TrashIcon from "../icons/TrashIcon"; // Ensure this path is correct
import { CSS } from "@dnd-kit/utilities";
import { useSortable } from "@dnd-kit/sortable";

interface Task {
  _id: string;
  content: string;
}

interface Props {
  task: Task;
  onRemove: (taskId: string) => void;
}


const TaskCard: React.FC<Props> = ({ task, onRemove }) => {
  const [editMode, setEditMode] = useState(false);
  const [content, setContent] = useState(task.content);
  
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
    id: task._id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const handleUpdateTask = async () => {
    if (content.trim() && content !== task.content) {
      try {
        const response = await fetch(`/api/Tasks/${task._id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ content: content.trim() }),
        });

        if (!response.ok) {
          throw new Error('Failed to update task');
        }
        console.log('Task updated successfully');
        setEditMode(false); // Exit edit mode on successful update
      } catch (error) {
        console.error('Error updating task:', error);
      }
    }
  };

  const handleDeleteTask = async () => {
    try {
      const response = await fetch(`/api/Tasks/${task._id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete task');
      }

      console.log('Task deleted successfully');
      onRemove(task._id); // Invoke the callback after successful deletion
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };
  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="task-card relative p-2 bg-white rounded shadow cursor-pointer hover:shadow-lg transition-shadow duration-150"
      onMouseEnter={() => setEditMode(true)}
      onMouseLeave={() => setEditMode(false)}
    >
      {editMode ? (
        <>
          <textarea
            className="w-full h-24 p-2 text-sm border border-gray-300 rounded resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={content}
            autoFocus
            onChange={(e) => setContent(e.target.value)}
          />
          <div className="flex justify-end space-x-2">
            <button
              className="px-4 py-1 text-sm text-blue-700 bg-blue-100 rounded hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
              onClick={handleUpdateTask}
            >
              Save
            </button>
            <button
              className="px-4 py-1 text-sm text-gray-700 bg-gray-100 rounded hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500"
              onClick={() => setEditMode(false)}
            >
              Cancel
            </button>
          </div>
        </>
      ) : (
        <p className="task-content">
          {content}
        </p>
      )}

      <button
        onClick={handleDeleteTask}
        className="stroke-gray-500 hover:stroke-white focus:stroke-white hover:bg-red-600 focus:bg-red-600 px-1 py-2 rounded transition-all duration-150 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
      >
        <TrashIcon />
      </button>
    </div>
  );
};

export default TaskCard;
