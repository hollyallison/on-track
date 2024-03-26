"use client"
import React, { useEffect, useState } from "react";
import KanbanColumn from "./KanbanColumn"; // Your KanbanColumn component
import PlusIcon from "../icons/PlusIcon"; 
import { Task, Column, } from '../task';


const exampleColumns: Column[] = [
    {
      id: 'column-1',
      title: 'To Do',
      tasks: [
        {
          id: 'task-1',
          title: 'Do 4 hours of lessons a week',
          description: 'First task description',
          status: 'To Do',
          columnId: 'column-1',
        },
        {
          id: 'task-2',
          title: 'Find driving instructor',
          description: 'Second task description',
          status: 'To Do',
          columnId: 'column-1',
        },
        // ... Add more tasks if necessary
      ],
    },
    {
      id: 'column-2',
      title: 'In Progress',
      tasks: [
        {
          id: 'task-3',
          title: 'Save for lessons',
          description: 'Third task description',
          status: 'In Progress',
          columnId: 'column-2',
        },
      ],
    },
    {
      id: 'column-3',
      title: 'Completed',
      tasks: [],
    },
  ];
  
  function KanbanBoard() {
    const [columns, setColumns] = useState<Column[]>([]);
    const [tasks, setTasks] = useState<Task[]>([]);

    const onTaskDelete = async (taskId: string) => {
        try {
          const response = await fetch(`api/Tasks/${taskId}`, {
            method: 'DELETE',
          });
          if (!response.ok) {
            throw new Error('Failed to delete the task');
          }
          // Successfully deleted the task, now remove it from the state
          setColumns(currentColumns => currentColumns.map(column => ({
            ...column,
            tasks: column.tasks.filter(task => task.id !== taskId),
          })));
          console.log(`Task with ID: ${taskId} has been deleted.`);
        } catch (error) {
          console.error("Error deleting task:", error);
        }
      };
      
      // Function to update a task
      const onTaskUpdate = async (taskId: string, updatedTask: Task) => {
        try {
          const response = await fetch(`api/Tasks/${taskId}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedTask),
          });
          if (!response.ok) {
            throw new Error('Failed to update the task');
          }
          // Successfully updated the task, now update it in the state
          setColumns(currentColumns => currentColumns.map(column => ({
            ...column,
            tasks: column.tasks.map(task => task.id === taskId ? updatedTask : task),
          })));
          console.log(`Task with ID: ${taskId} has been updated.`);
        } catch (error) {
          console.error("Error updating task:", error);
        }
      };
  
    useEffect(() => {
      const fetchInitialData = async () => {
        try {
          const boardDataRes = await fetch("/api/Boards/1");
          if (boardDataRes.ok) {
            const boardData = await boardDataRes.json();
            setColumns(boardData.columns || exampleColumns);
          } else {
            // Initialize with a blank board if there's no existing board
            setColumns(exampleColumns);
          }
        } catch (error) {
          console.error("Failed to fetch initial data:", error);
          setColumns(exampleColumns);
        }
      };
  
      fetchInitialData();
    }, []);

    const createNewColumn = async () => {
        const newColumnTitle = `New Column ${columns.length + 1}`;
        const newColumn = {
          id: `column-${columns.length + 1}`, 
          title: newColumnTitle,
          tasks: [],
        };

        const res = await fetch('/api/Columns', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newColumn),
        });

        if (res.ok) {
            const { data } = await res.json();
            setColumns([...columns, data]);
        }
    };

    // The column will manage its tasks, including drag-and-drop interactions
    // So there's no need to handle drag-and-drop events at this board level

    return (
        <div className="kanban-board">
          <button onClick={createNewColumn} className="mb-4 inline-flex items-center bg-blue-500 text-white px-3 py-2 rounded-md">
            <PlusIcon /> Add Column
          </button>
          {columns.map((column) => (
            <KanbanColumn
              key={column.id}
              column={column}
              tasks={column.tasks}
              onTaskDelete={onTaskDelete}
              onTaskUpdate={onTaskUpdate}
            />
          ))}
        </div>
      );
    }
    
    export default KanbanBoard;