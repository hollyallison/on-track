import React, { useState } from "react";
import TrashIcon from "../icons/TrashIcon";
import { Task } from "../task";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface Props {
  task: Task;
  onTaskDelete: (id: string) => void;
  onTaskUpdate: (taskId: string, newContent: string) => void;
}

const TaskCard: React.FC<Props> = ({ task, onTaskDelete, onTaskUpdate }) => {
  const [mouseIsOver, setMouseIsOver] = useState<boolean>(false);
  const [editMode, setEditMode] = useState<boolean>(false);
  const [content, setContent] = useState<string>(task.description || "");

  const { setNodeRef, attributes, listeners, transform, transition, isDragging } = useSortable({
    id: task.id,
  });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  const toggleEditMode = () => {
    setEditMode(!editMode);
    setMouseIsOver(false);
  };

  const handleUpdateTask = () => {
    if (content !== task.description) {
      onTaskUpdate(task.id, content);
    }
    toggleEditMode();
  };

  const handleDeleteTask = () => {
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
          onBlur={handleUpdateTask}
          onChange={(e) => setContent(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              handleUpdateTask();
            }
          }}
        />
      ) : (
        <p className="my-auto h-[90%] w-full overflow-y-auto overflow-x-hidden whitespace-pre-wrap text-center" onDoubleClick={toggleEditMode}>
          {content}
        </p>
      )}

      {mouseIsOver && (
        <button
          onClick={handleDeleteTask}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-red-400 p-2 rounded opacity-60 hover:opacity-100"
        >
          <TrashIcon />
        </button>
      )}
    </div>
  );
};

export default TaskCard;
