import React, { useState } from "react";
import TrashIcon from "../icons/TrashIcon"; 
import { CSS } from "@dnd-kit/utilities";
import { useSortable } from "@dnd-kit/sortable";

interface Task {
  _id: string;
  content: string;
}

interface Props {
  task: Task;
  onRemove: (taskId: string) => void;
}


const TaskCard: React.FC<Props> = ({ task, onRemove }) => {
  const [editMode, setEditMode] = useState(false);
  const [mouseIsOver, setMouseIsOver] = useState(false);
  const [content, setContent] = useState(task.content);
  
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: task._id,
    data: {
      type: "Task",
      task,
    },
    disabled: editMode,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };



  const handleUpdateTask = async () => {
    if (content.trim() && content !== task.content) {
      try {
        const response = await fetch(`/api/Tasks/${task._id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ content: content.trim() }),
        });

        if (!response.ok) {
          throw new Error('Failed to update task');
        }
        console.log('Task updated successfully');
        setEditMode(false); 
      } catch (error) {
        console.error('Error updating task:', error);
      }
    }
  };

  const handleDeleteTask = async () => {
    try {
      const response = await fetch(`/api/Tasks/${task._id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete task');
      }

      console.log('Task deleted successfully');
      onRemove(task._id); 
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  if (isDragging) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        className="
        opacity-30
      bg-mainBackgroundColor p-2.5 h-[100px] min-h-[100px] items-center flex text-left rounded-xl border-2 border-rose-500  cursor-grab relative
      "
      />
    );
  }
  
  if (editMode) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        {...attributes}
        {...listeners}
        className="bg-mainBackgroundColor p-2.5 h-[100px] min-h-[100px] items-center flex text-left rounded-xl hover:ring-2 hover:ring-inset hover:ring-rose-500 cursor-grab relative"
      >
        <textarea
          className="
        h-[90%]
        w-full resize-none border-none rounded bg-transparent text-white focus:outline-none
        "
            value={content}
            onClick={handleUpdateTask}
            onChange={(e) => setContent(e.target.value)}/>
        <p className="task-content">
          {content}
        </p>
      </div> 
      )} 

      return (
        <div
          ref={setNodeRef}
          style={style}
          {...attributes}
          {...listeners}
          onClick={handleUpdateTask}
          className="bg-mainBackgroundColor p-2.5 h-[100px] min-h-[100px] items-center flex text-left rounded-xl hover:ring-2 hover:ring-inset hover:ring-rose-500 cursor-grab relative task"
          onMouseEnter={() => {
            setMouseIsOver(true);
          }}
          onMouseLeave={() => {
            setMouseIsOver(false);
          }}
        >
          <p className="my-auto h-[90%] w-full overflow-y-auto overflow-x-hidden whitespace-pre-wrap">
            {task.content}
          </p>
    
          {mouseIsOver && (
            <button
              onClick={handleDeleteTask}
              className="stroke-white absolute right-4 top-1/2 -translate-y-1/2 bg-columnBackgroundColor p-2 rounded opacity-60 hover:opacity-100"
            >
              <TrashIcon />
            </button>
          )}
        </div>
      );
    }
    
export default TaskCard;    
