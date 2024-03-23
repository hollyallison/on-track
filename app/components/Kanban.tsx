"use client"
import React, { useState, useEffect } from 'react';
import PlusIcon from '../icons/PlusIcon';
import KanbanColumn from './KanbanColumn';
import {
  fetchColumns,
  fetchTasks,
  createColumn,
  createTaskForColumn,
  deleteColumn,
  updateColumnTitle,
} from '../../pages/api/utils'; // Adjust the import path as necessary

const KanbanBoard = () => {
  const [columns, setColumns] = useState([]);
  const [boardId, setBoardId] = useState('yourBoardIdHere'); // Placeholder. Adjust as needed to dynamically set or fetch the board ID.

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const fetchedColumns = await fetchColumns(boardId);
        setColumns(fetchedColumns);
      } catch (error) {
        console.error('Failed to fetch initial data:', error);
      }
    };

    fetchInitialData();
  }, [boardId]);

  const handleAddColumn = async () => {
    try {
      const newColumnTitle = `New Column ${columns.length + 1}`;
      const newColumn = await createColumn(boardId, newColumnTitle);
      setColumns([...columns, newColumn]);
    } catch (error) {
      console.error('Failed to add column:', error);
    }
  };

  const handleDeleteColumn = async (columnId) => {
    try {
      await deleteColumn(boardId, columnId);
      setColumns(columns.filter((column) => column.id !== columnId));
    } catch (error) {
      console.error('Failed to delete column:', error);
    }
  };

  const handleUpdateColumn = async (columnId, newTitle) => {
    try {
      await updateColumnTitle(boardId, columnId, newTitle);
      const updatedColumns = columns.map((column) =>
        column.id === columnId ? { ...column, title: newTitle } : column
      );
      setColumns(updatedColumns);
    } catch (error) {
      console.error('Failed to update column:', error);
    }
  };

  const handleAddTask = async (columnId, taskContent) => {
    try {
      const newTask = await createTaskForColumn(boardId, columnId, { content: taskContent });
      // Here you might want to fetch columns again to refresh the tasks, or implement a local update logic.
    } catch (error) {
      console.error('Failed to add task:', error);
    }
  };

  return (
    <div className="kanban-board">
      <div className="header">
        <button onClick={handleAddColumn}>
          <PlusIcon /> Add Column
        </button>
      </div>
      <div className="columns-container">
        {columns.map((column) => (
          <KanbanColumn
            key={column.id}
            column={column}
            onDeleteColumn={() => handleDeleteColumn(column.id)}
            onUpdateColumn={(newTitle) => handleUpdateColumn(column.id, newTitle)}
            onAddTask={handleAddTask}
          />
        ))}
      </div>
    </div>
  );
};

export default KanbanBoard;
