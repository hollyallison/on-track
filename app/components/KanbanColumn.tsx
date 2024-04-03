import React, { useState } from 'react';
import TrashIcon from '../icons/TrashIcon';
import PlusIcon from '../icons/PlusIcon';
import KanbanTask from './KanbanTask';
import { Task, Column } from '../task';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors, DragEndEvent } from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';

interface KanbanColumnProps {
  column: Column;
  tasks: Task[];
  onTaskCreate: (columnId: string, newTaskContent: string) => Promise<void>;
  onTaskRemove: (columnId: string, taskId: string) => void;
}


const ColumnContainer: React.FC<KanbanColumnProps> = ({
  column,
  tasks = [], 
  onTaskCreate,
  onTaskRemove
}) => {
  const sensors = useSensors(useSensor(PointerSensor), useSensor(KeyboardSensor));
  const [editMode, setEditMode] = useState(false);
  


  

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      const oldIndex = tasks.findIndex((task) => task._id === active.id);
      const newIndex = tasks.findIndex((task) => task._id === over.id);
    }
  };

  const handleAddTaskClick = async () => {
    const newTaskData = {
      content: "New Task", 
      columnId: column._id,
      status: "To Do",
    };

    try {
      const response = await fetch('/api/Tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newTaskData),
      });

      if (!response.ok) {
        throw new Error('Failed to create task');
      }

      const { data: createdTask } = await response.json();
      onTaskCreate(column._id, createdTask);
    } catch (error) {
      console.error('Error creating task:', error);
    }
  };

  return (
    <div className="bg-gray-100 w-[350px] h-auto max-h-[800px] rounded-lg shadow-lg flex flex-col p-6 space-y-4">
      <div className="flex items-center justify-between">
        {!editMode ? (
          <h2 onClick={() => setEditMode(true)} className="text-xl font-semibold cursor-pointer">{column.title}</h2>
        ) : (
          <input
            type="text"
            defaultValue={column.title}
            onBlur={() => setEditMode(false)} 
            autoFocus
            className="text-xl font-semibold p-2 rounded border-gray-300"
          />
        )}

        <button onClick={handleAddTaskClick} title="Add task" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded inline-flex items-center">
          <PlusIcon />
          <span className="ml-2">Add Task</span>
        </button>
      </div>

      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={tasks.map((task) => task._id)} strategy={verticalListSortingStrategy}>
        {tasks.map(task => (
        <KanbanTask
          key={task._id}
          task={task}
          onRemove={() => onTaskRemove(column._id, task._id)}
        />
      ))}
        </SortableContext>
      </DndContext>
 
      <button onClick={() => {/* add delete*/}}  className="stroke-gray-500 hover:stroke-white focus:stroke-white hover:bg-red-600 focus:bg-red-600 px-1 py-2 rounded transition-all duration-150 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
      <TrashIcon />
    </button>
    </div>
  );
};


export default ColumnContainer;
