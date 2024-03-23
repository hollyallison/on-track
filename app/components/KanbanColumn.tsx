import React, { useState } from "react";
import { SortableContext, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import TrashIcon from "../icons/TrashIcon";
import PlusIcon from "../icons/PlusIcon";
import KanbanCard from "./KanbanCard";
import { Column, Task } from "../task"; // Adjust path as necessary
import { createTaskForColumn, deleteColumn, updateColumnTitle } from './../../pages/api/utils';



// Updated Props interface to match actual component usage
interface Props {
  column: Column;
  tasks: Task[];
  refreshData: () => void; 
}

const ColumnContainer: React.FC<Props> = ({ column, tasks, refreshData }) => {
  const [editMode, setEditMode] = useState(false);
  const [newTitle, setNewTitle] = useState(column.title);
  const [newTaskContent, setNewTaskContent] = useState("");

  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
    id: column.id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const handleUpdateColumnTitle = async () => {
    if (newTitle !== column.title) {
      await updateColumnTitle(column.id, newTitle);
      setEditMode(false);
      refreshData();
    }
  };

  const handleDeleteColumn = async () => {
    await deleteColumn(column.id);
    refreshData();
  };

  const handleAddTask = async () => {
    if (newTaskContent.trim()) {
      await createTaskForColumn(column.id, { content: newTaskContent }); // Assume createTaskAPI accepts columnId and task object
      setNewTaskContent("");
      refreshData();
    }
  };

  return (
    <div ref={setNodeRef} style={style} className="bg-gray-50 w-[350px] h-[500px] max-h-[800px] rounded-md flex flex-col">
      <div {...attributes} {...listeners} className="p-3 font-bold flex justify-between items-center">
        {editMode ? (
          <input
            type="text"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            onBlur={handleUpdateColumnTitle}
            onKeyDown={(e) => e.key === "Enter" && handleUpdateColumnTitle()}
            className="outline-none border-none bg-gray-100 p-2 rounded"
          />
        ) : (
          <span onDoubleClick={() => setEditMode(true)}>{column.title}</span>
        )}
        <button onClick={handleDeleteColumn}>
          <TrashIcon />
        </button>
      </div>
      <SortableContext items={tasks.map((task) => task.id)}>
        {tasks.map((task) => (
          <KanbanCard key={task.id} task={task} deleteTask={() => {}} updateTask={() => {}} refreshData={refreshData} />
        ))}
      </SortableContext>
      <div className="p-4">
        <input
          type="text"
          value={newTaskContent}
          onChange={(e) => setNewTaskContent(e.target.value)}
          placeholder="Add new task..."
          className="outline-none border-none bg-gray-100 p-2 rounded w-full"
        />
        <button onClick={handleAddTask} className="mt-2">
          <PlusIcon />
        </button>
      </div>
    </div>
  );
};

export default ColumnContainer;
