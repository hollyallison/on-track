// TaskColumn.js
import React from 'react';
import TaskCard from './TaskCard';
import AddTaskButton from './AddTaskButton';
import { Input } from "@/components/ui/input"

function TaskColumn({ tasks, onAdd }) {
    return (
        <div className="min-w-[420px] max-w-[580px] p-2 bg-slate-50 rounded shadow">
          <div className="flex justify-between">
            <Input 
              className="w-full border-0 bg-transparent hover:bg-white rounded-md hover:border-sky-400 hover:border-2" 
              type="text" 
              placeholder="Column Title" 
            />
          </div>
          <div className="space-y-4 mt-4">
            {tasks.map(task => (
              <TaskCard key={task.id} {...task} />
            ))} 
          </div>
          <AddTaskButton onAdd={onAdd} />
        </div>
      );
    }
export default TaskColumn;

