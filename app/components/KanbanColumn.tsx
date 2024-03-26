import React, { useState, useEffect } from "react";
import TrashIcon from "../icons/TrashIcon";
import PlusIcon from "../icons/PlusIcon";
import KanbanTask from "./KanbanTask"; // Make sure this is the correct import path
import { Task, Column } from "../task";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors, DragEndEvent } from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";

interface KanbanColumnProps {
  column: Column;
  tasks: Task[];
  // Add prop signatures for onTaskDelete and onTaskUpdate
  onTaskDelete: (taskId: string) => void;
  onTaskUpdate: (taskId: string, newContent: string) => void;
}

const ColumnContainer: React.FC<KanbanColumnProps> = ({ column, tasks, onTaskDelete, onTaskUpdate }) => {
  const [editMode, setEditMode] = useState(false);

  // Removed the local tasks state as tasks are now passed as props

  useEffect(() => {
    // Since tasks are now managed by the parent, fetching tasks might also be handled by the parent component
  }, [column]);

  const sensors = useSensors(useSensor(PointerSensor), useSensor(KeyboardSensor));

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = tasks.findIndex((task) => task.id === active.id);
      const newIndex = tasks.findIndex((task) => task.id === over.id);

      // This operation should now ideally be moved to the parent component
      const newTasks = arrayMove(tasks, oldIndex, newIndex);
      // setTasks(newTasks); // This should be handled by the parent component
    }
  };

  const createTask = async () => {
    // Task creation logic here
  };

  return (
    <div className="bg-gray-50 w-[350px] h-auto max-h-[800px] rounded-md flex flex-col p-4">
      <div className="flex items-center justify-between mb-4">
        {!editMode ? (
          <h2 onClick={() => setEditMode(true)} className="text-xl font-bold">{column.title}</h2>
        ) : (
          <input
            type="text"
            defaultValue={column.title}
            onBlur={(e) => {
              setEditMode(false);
              // Update column title here, possibly informing the parent component
            }}
            autoFocus
            className="text-xl font-bold"
          />
        )}
        <button onClick={createTask} title="Add task">
          <PlusIcon />
        </button>
      </div>

      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={tasks.map((task) => task.id)} strategy={verticalListSortingStrategy}>
          {tasks.map((task) => (
            <KanbanTask key={task.id} task={task} onTaskDelete={onTaskDelete} onTaskUpdate={onTaskUpdate} />
          ))}
        </SortableContext>
      </DndContext>

      <button onClick={() => {/* handle delete column */}} title="Delete column">
        <TrashIcon />
      </button>
    </div>
  );
};

export default ColumnContainer;
