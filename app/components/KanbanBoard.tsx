"use client";
import React, { useEffect, useState } from "react";
import KanbanColumn from "./KanbanColumn";
import PlusIcon from "../icons/PlusIcon";
import { Column, Task } from '../task';

const KanbanBoard = () => {
  const [columns, setColumns] = useState<Column[]>([]);

  useEffect(() => {
    const fetchInitialData = async () => {
      const boardId = "6604307f933f7cfe75001392"; // Replace with your actual board ID
      try {
        const response = await fetch(`/api/Boards/${boardId}`);
        if (!response.ok) {
          throw new Error('Board data fetch failed');
        }
        const { data } = await response.json();
        if (data && Array.isArray(data.columns)) {
          setColumns(data.columns);
        } else {
          throw new Error("Board data is missing 'columns' field or 'columns' is not an array");
        }
      } catch (error) {
        console.error("Failed to fetch board data:", error.message);
      }
    };

    fetchInitialData();
  }, []);

  const onTaskCreate = async (columnId: string) => {
    const newTaskData = {
      content: '', // Start with empty content, user will edit this
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

      // Update the columns state with the new task
      setColumns(currentColumns =>
        currentColumns.map(column => {
          if (column._id === columnId) {
            const updatedTasks = column.tasks ? [...column.tasks, newTask] : [newTask];
            return { ...column, tasks: updatedTasks };
          }
          return column;
        })
      );
    } catch (error) {
      console.error('Failed to create new task:', error.message || 'An unknown error occurred');
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
      {columns.map((column) => (
        <KanbanColumn key={column._id} column={column} tasks={column.tasks || []} onTaskCreate={onTaskCreate} />
      ))}
    </div>
  );
};

export default KanbanBoard;

