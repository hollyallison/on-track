import { useState } from "react";
import TrashIcon from "../icons/TrashIcon";
import { Task } from "../task";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface Props {
  task: Task;
  onTaskDelete: (id: string) => void; 
  onTaskUpdate: () => void; 
}

function TaskCard({ task, onTaskDelete, onTaskUpdate }: Props) {
  const [mouseIsOver, setMouseIsOver] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [content, setContent] = useState(task.description);

  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: task.id,
  });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  const toggleEditMode = () => {
    setEditMode((prev) => !prev);
    setMouseIsOver(false);
  };

  const updateTask = async () => {
    if (content !== task.description) {
      await fetch(`/api/tasks/${task.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content }),
      });
      onTaskUpdate(); 
    }
    toggleEditMode();
  };

  const deleteTask = async () => {
    await fetch(`/api/Tasks/${task.id}`, {
      method: 'DELETE',
    });
    onTaskDelete(task.id);
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      onMouseEnter={() => setMouseIsOver(true)}
      onMouseLeave={() => setMouseIsOver(false)}
      className={`p-2.5 h-[100px] min-h-[100px] flex items-center text-center rounded-xl cursor-grab relative ${
        isDragging ? "opacity-30 bg-blue-300 border-2" : "bg-gray-100 hover:ring-2 hover:ring-inset hover:ring-blue-500"
      }`}
    >
      {editMode ? (
        <textarea
          className="h-[90%] w-full resize-none border-none rounded bg-transparent text-gray-500 focus:outline-none focus:ring-0 focus:shadow-none"
          value={content}
          autoFocus
          placeholder="Task content here"
          onBlur={updateTask}
          onChange={(e) => setContent(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && e.shiftKey) {
              updateTask();
            }
          }}
        />
      ) : (
        <p className="my-auto h-[90%] w-full overflow-y-auto overflow-x-hidden whitespace-pre-wrap text-center" onClick={toggleEditMode}>
          {content}
        </p>
      )}

      {mouseIsOver && (
        <button
          onClick={deleteTask}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-red-400 p-2 rounded opacity-60 hover:opacity-100"
        >
          <TrashIcon />
        </button>
      )}
    </div>
  );
}

export default TaskCard;
