"use client"
import React, { useState } from 'react';
import TaskColumn from './TaskColumn';
import AddColumnButton from './AddColumnButton'; 
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { Input } from "@/components/ui/input"


function TaskBoard() {
  const [columns, setColumns] = useState([
    { id: 1, title: "To Do", tasks: [{ id: 1, title: "Task 1", status: "To Do" }] },
    { id: 2, title: "In Progress", tasks: [{ id: 2, title: "Task 2", status: "In Progress" }] },
    { id: 3, title: "Done", tasks: [{ id: 3, title: "Task 3", status: "Done" }] },
  ]);

  const addColumn = (columnTitle) => {
    const newColumn = {
      id: Date.now(), 
      title: columnTitle,
      tasks: []
    };
    setColumns(prevColumns => [...prevColumns, newColumn]);
  };

  const addTask = (columnId, taskTitle) => {
    const newTask = { id: Date.now(), title: taskTitle, status: columnId };
    setColumns(prevColumns =>
      prevColumns.map(column =>
        column.id === columnId ? { ...column, tasks: [...column.tasks, newTask] } : column
      )
    );
  };

  return (
    <div className="flex flex-col w-full h-full rounded-lg shadow-md">
      <header className="flex justify-between items-center px-4 py-2 bg-sky-200 rounded-lg shadow-md">
        <Input 
          className="w-1/4 border-0 bg-transparent focus:bg-white rounded-md focus:border-sky-400 focus:border-2" 
          type="text" 
          placeholder="Goal Title"
        />
        <AddColumnButton onAddColumn={addColumn} />
      </header>
     
      <ScrollArea className="flex-grow w-full max-w-full whitespace-nowrap rounded-md border h-4/6 bg-sky-50">
        <div className="flex space-x-4 p-4">
          {columns.map(column => (
            <TaskColumn 
              key={column.id}
              title={column.title} 
              tasks={column.tasks}
              onAdd={(taskTitle) => addTask(column.id, taskTitle)}
            />
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>

  );
}
export default TaskBoard;

