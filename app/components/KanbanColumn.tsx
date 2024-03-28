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
  onTaskCreate: (columnId: string, newTask: Task) => void;
}


const ColumnContainer: React.FC<KanbanColumnProps> = ({ column, tasks, onTaskCreate }) => {
  const sensors = useSensors(useSensor(PointerSensor), useSensor(KeyboardSensor));

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      const oldIndex = tasks.findIndex((task) => task._id === active.id);
      const newIndex = tasks.findIndex((task) => task._id === over.id);
      // Call a method to update the order in the backend and then refresh the tasks list
    }
  };

  const handleAddTaskClick = async () => {
    const newTaskData = {
      content: "New Task", // Default content for new task
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
    <div className="bg-gray-50 w-[350px] h-auto max-h-[800px] rounded-md flex flex-col p-4">
      <div className="flex items-center justify-between mb-4">
        {/* Existing code for column title */}
      </div>

      <button onClick={handleAddTaskClick} title="Add task" className="add-task-button">
        <PlusIcon />
      </button>

      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={tasks.map((task) => task._id)} strategy={verticalListSortingStrategy}>
          {tasks.map((task) => (
            <KanbanTask key={task._id} task={task} />
          ))}
        </SortableContext>
      </DndContext>

      {/* Button for deleting a column */}
    </div>
  );
};

export default ColumnContainer;
