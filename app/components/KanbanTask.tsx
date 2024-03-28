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
}

const TaskCard: React.FC<Props> = ({ task }) => {
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

        const updatedTaskData = await response.json();
        console.log('Task updated successfully', updatedTaskData);

        // Reset edit mode
        setEditMode(false);
      } catch (error) {
        console.error('Error updating task:', error);
      }
    } else {
      // If no changes or content is only whitespace, just exit edit mode
      setEditMode(false);
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
      // Consider invoking a callback to remove the task from the parent component's state
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
      className={`task-card ${editMode ? 'edit-mode' : ''}`}
      onMouseEnter={() => setEditMode(true)}
      onMouseLeave={() => setEditMode(false)}
    >
      {editMode ? (
        <textarea
          className="task-edit-input"
          value={content}
          autoFocus
          onChange={(e) => setContent(e.target.value)}
          onBlur={handleUpdateTask}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleUpdateTask();
            }
          }}
        />
      ) : (
        <p className="task-content" onDoubleClick={() => setEditMode(true)}>
          {content}
        </p>
      )}

      <button
        onClick={handleDeleteTask}
        className="delete-task-button"
      >
        <TrashIcon />
      </button>
    </div>
  );
};

export default TaskCard;
