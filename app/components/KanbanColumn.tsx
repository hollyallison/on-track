import React, { useState, useEffect } from "react";
import axios from 'axios';
import TrashIcon from "../icons/TrashIcon";
import PlusIcon from "../icons/PlusIcon";
import KanbanCard from "./KanbanCard";
import { Column, Id, Task } from "../task"; // Ensure these types are correctly defined
import { SortableContext, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface Props {
  column: Column;
  onColumnDelete: (id: Id) => void;
  onTaskCreate: (newTask: Task) => void; // Adjusted for clarity
}

function ColumnContainer({
  column,
  onColumnDelete,
  onTaskCreate,
}: Props) {
  const [editMode, setEditMode] = useState(false);
  const [title, setTitle] = useState(column.title);

  useEffect(() => {
    setTitle(column.title); // Ensure title is up-to-date if column prop changes
  }, [column.title]);

  const { setNodeRef, attributes, listeners, transform, transition } = useSortable({
    id: column.id.toString(), // Ensure id is treated as a string
    data: { type: "Column", column },
  });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  const updateColumn = async () => {
    try {
      await axios.put(`/api/Columns/${column.id}`, { title });
      setEditMode(false); // Exit edit mode on successful update
    } catch (error) {
      console.error('Failed to update column:', error);
    }
  };

  const deleteColumn = () => {
    onColumnDelete(column.id);
  };

  const createTask = async () => {
    try {
      const response = await axios.post<Task>(`/api/Cards`, {
        columnId: column.id,
        content: "New Task",
      });
      onTaskCreate(response.data); // Assuming the newly created task object is returned
    } catch (error) {
      console.error('Failed to create task:', error);
    }
  };

  // Fixed mapping over tasks with correct prop passing to KanbanCard
  return (
    <div ref={setNodeRef} style={style} className="bg-gray-50 w-[350px] h-[500px] max-h-[800px] rounded-md flex flex-col">
      <div {...attributes} {...listeners} onClick={() => setEditMode(true)} className="bg-gray-50 text-gray-700 h-[60px] cursor-grab rounded-md rounded-b-none p-3 font-bold border-gray-200 border-4 flex items-center justify-between hover:shadow-lg transition-all duration-300">
        {!editMode ? (
          <span>{title}</span>
        ) : (
          <input
            type="text"
            className="bg-white border rounded outline-none px-2 focus:outline-none focus:ring-0 focus:shadow-none"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onBlur={updateColumn}
            onKeyDown={(e) => e.key === "Enter" && updateColumn()}
          />
        )}
        <button onClick={deleteColumn} className="stroke-gray-500 hover:stroke-white hover:bg-red-500 rounded px-1 py-2">
          <TrashIcon />
        </button>
      </div>

      <SortableContext items={column.tasks.map(task => task.id.toString())}>
        {column.tasks.map(task => (
          <KanbanCard
            key={task.id.toString()}
            task={task}
            onDeleteTask={() => {}} // Implement or pass correct handler
            onMoveTask={() => {}} // Implement or pass correct handler
            boardId="board-id-placeholder" // Provide correct boardId
            columnId={column.id.toString()} // Ensure columnId is passed as a string
          />
        ))}
      </SortableContext>

      <button onClick={createTask} className="mt-auto flex items-center justify-center gap-2 border-2 border-gray-200 rounded-md p-4 hover:text-green-500 active:bg-green-500 text-black">
        <PlusIcon /> Add task
      </button>
    </div>
  );
}

export default ColumnContainer;
