import { useState, useEffect } from "react";
import axios from 'axios';
import TrashIcon from "../icons/TrashIcon";
import { Id, Task } from "../task";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface Props {
  task: Task;
  onDeleteTask: (id: Id) => void;
  onMoveTask: (taskId: Id, newColumnId: Id) => void;
  boardId: string; // Add boardId to the props
  columnId: string; // Add columnId if needed for moving tasks between columns
}

function TaskCard({ task, onDeleteTask, onMoveTask, boardId, columnId }: Props) {
  const [content, setContent] = useState(task.content);
  const [editMode, setEditMode] = useState(false);

  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    over,
    active,
    isDragging,
  } = useSortable({
    id: task.id,
    data: {
      type: "Task",
      task,
    },
    disabled: editMode,
  });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  useEffect(() => {
    setContent(task.content); // Ensure content is up-to-date when task prop changes
  }, [task]);

  useEffect(() => {
    // Logic for handling task movement across columns if implemented
  }, [isDragging, over, active, onMoveTask, task.id]);

  const toggleEditMode = () => {
    setEditMode(!editMode);
    if (editMode) {
      updateTask();
    }
  };

  const updateTask = async () => {
    try {
      // Include boardId in the request to correctly identify the task's board
      await axios.put(`/api/Cards/${task.id}`, { content, boardId, columnId });
      // Handle UI update or re-fetching here if necessary
    } catch (error) {
      console.error('Failed to update task:', error);
    }
  };

  const deleteTask = async () => {
    try {
      // Include boardId in the delete request for backend to correctly locate the task
      await axios.delete(`/api/Cards/${task.id}`, { data: { boardId, columnId }});
      onDeleteTask(task.id); // Notify the parent component to remove this task from the UI
    } catch (error) {
      console.error('Failed to delete task:', error);
    }
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`p-2.5 h-[100px] min-h-[100px] items-center flex text-center rounded-xl cursor-grab relative task ${isDragging ? 'opacity-30 bg-blue-300' : editMode ? 'bg-gray-300' : 'bg-gray-100'}`}
      onMouseEnter={() => setEditMode(true)}
      onMouseLeave={() => setEditMode(false)}
    >
      {editMode ? (
        <textarea
          className="h-[90%] w-full resize-none border-none rounded bg-transparent text-gray-500 focus:outline-none focus:ring-0 focus:shadow-none"
          value={content}
          autoFocus
          placeholder="Task content here"
          onBlur={toggleEditMode} // Toggle edit mode on blur
          onChange={(e) => setContent(e.target.value)}
        />
      ) : (
        <>
          <p className="my-auto h-[90%] w-full overflow-y-auto overflow-x-hidden whitespace-pre-wrap text-center">
            {content}
          </p>
          <button
            onClick={deleteTask}
            className="stroke-white absolute right-4 top-1/2 -translate-y-1/2 bg-red-400 p-2 rounded opacity-60 hover:opacity-100"
          >
            <TrashIcon />
          </button>
        </>
      )}
    </div>
  );
}

export default TaskCard;
