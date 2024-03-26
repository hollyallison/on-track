"use client"
import React, { useEffect, useState } from "react";
import KanbanColumn from "./KanbanColumn"; // Your KanbanColumn component
import PlusIcon from "../icons/PlusIcon"; 
import { Task, Column, } from '../task';

function KanbanBoard() {
  const [columns, setColumns] = useState<Column[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);

    useEffect(() => {
        // Fetch initial board data with columns and tasks
        const fetchInitialData = async () => {
            const boardDataRes = await fetch("/api/Boards/1");
            const boardData = await boardDataRes.json();
            setColumns(boardData.columns || []);

            // Assuming tasks are fetched in a separate call
            // Correct the endpoint if there was a typo ("/api/asks" -> "/api/tasks")
            const tasksRes = await fetch("/api/tasks");
            const tasksData = await tasksRes.json();
            setTasks(tasksData.tasks || []);
        };

        fetchInitialData();
    }, []);

    const createNewColumn = async () => {
        const newColumn = {
            title: `New Column ${columns.length + 1}`,
            tasks: []
        };

        const res = await fetch('/api/columns', {
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
                    tasks={tasks.filter(task => task.columnId === column.id)}
                    // Ensure KanbanColumn and KanbanTask are updated to handle their tasks
                />
            ))}
        </div>
    );
}

export default KanbanBoard;
