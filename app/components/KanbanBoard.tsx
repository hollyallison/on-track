"use client";
import React, { useEffect, useState } from "react";
import KanbanColumn from "./KanbanColumn";
import PlusIcon from "../icons/PlusIcon";
import { Column, Task } from '../task';

interface KanbanColumnProps {
  column: Column;
  tasks: Task[];
  onTaskCreate: (columnId: string, newTaskContent: string) => Promise<void>;
}

const KanbanBoard = () => {
  const [columns, setColumns] = useState<Column[]>([]);

  const removeTaskFromUI = (columnId: string, taskId: string) => {
    setColumns(currentColumns => 
      currentColumns.map(column => 
        column._id === columnId ? {...column, tasks: column.tasks.filter(task => task._id !== taskId)} : column
      )
    );
  };

  useEffect(() => {
    const fetchInitialData = async () => {
      const boardId = "6604307f933f7cfe75001392";
      try {
        const response = await fetch(`/api/Boards/${boardId}`);
        if (!response.ok) throw new Error('Board data fetch failed');
        const { data } = await response.json();
        if (data && Array.isArray(data.columns)) {
          setColumns(data.columns);
        } else {
          throw new Error("Board data is missing 'columns' field or 'columns' is not an array");
        }
      } catch (error) {
        console.error("Failed to fetch board data:", error instanceof Error ? error.message : "An unknown error occurred");
      }
    };

    fetchInitialData();
  }, []);

  const onTaskCreate = async (columnId: string, newTaskContent: string) => {
    const newTaskData = {
      content: newTaskContent,
      columnId: columnId,
      status: 'To Do',
    };

    try {
      const response = await fetch('/api/Tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newTaskData),
      });

      if (!response.ok) throw new Error('Failed to create task');
      const { data: newTask } = await response.json();

      setColumns(currentColumns => 
        currentColumns.map(column => 
          column._id === columnId ? { ...column, tasks: [...(column.tasks || []), newTask] } : column
        )
      );
    } catch (error) {
      console.error('Failed to create new task:', error instanceof Error ? error.message : "An unknown error occurred");
    }
  };


  const createNewColumn = async () => {
    const newColumnTitle = `New Column ${columns.length + 1}`;
    try {
      const response = await fetch('/api/Columns', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: newColumnTitle }),
      });

      if (!response.ok) {
        throw new Error('Failed to create new column');
      }

      const { data: newColumn } = await response.json();
      setColumns(prevColumns => [...prevColumns, newColumn]);
    } catch (error) {
      console.error('Failed to create new column:', error.message);
    }
  };

  return (
    <div className="kanban-board">

      <button onClick={createNewColumn} className="mb-4 inline-flex items-center bg-blue-500 text-white px-3 py-2 rounded-md">
        <PlusIcon /> Add Column
      </button>
      {columns.map(column => (
        <KanbanColumn
          key={column._id}
          column={column}
          tasks={column.tasks}
          onTaskCreate={onTaskCreate}
          onTaskRemove={removeTaskFromUI} 
        />
      ))}
    </div>
  );
};

export default KanbanBoard;

