"use client"
import React, { useState, useEffect } from "react";
import axios from "axios";
import PlusIcon from "../icons/PlusIcon";
import KanbanColumn from "./KanbanColumn";
import {
  DndContext,
  DragEndEvent,
  DragStartEvent,
  DragOverlay,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { SortableContext } from "@dnd-kit/sortable";
import { createPortal } from "react-dom";
import { Column, Id, Task, Goal } from "../task";

function KanbanBoard() {
  const defaultColumns = [
    { id: "column-1", title: "To Do", tasks: [] },
    { id: "column-2", title: "In Progress", tasks: [] },
    { id: "column-3", title: "Completed", tasks: [] },
  ];

  const [columns, setColumns] = useState<Column[]>(defaultColumns);
  const [goals, setGoals] = useState<Goal[]>([]);

  // Define sensors for drag-and-drop
  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 10 } }));

  // Fetch boards when the component mounts
  useEffect(() => {
    const fetchBoards = async () => {
      try {
        const response = await axios.get('/api/Boards');
        // If boards exist, use the first one, otherwise use default columns
        const boardData = response.data.length > 0 ? response.data[0] : null;
        setColumns(boardData ? boardData.columns : defaultColumns);
        setGoals(boardData ? boardData.goals : []);
      } catch (error) {
        console.error('Failed to fetch boards:', error);
        // If error, use default columns
        setColumns(defaultColumns);
      }
    };
    fetchBoards();
  }, []);

  // Function to create a new column
  const createNewColumn = async (title: string) => {
    try {
      // Replace "YourBoardId" with the actual ID of the current board
      const response = await axios.post('/api/Columns', { title, boardId: "YourBoardId" });
      setColumns(prev => [...prev, response.data]);
    } catch (error) {
      console.error('Error creating new column:', error);
    }
  };

    const handleColumnDelete = (id: Id) => {
      console.log("Deleting column with id: ", id);
      // Add actual deletion logic here
    };

    const handleTaskCreate = (task: Task) => {
      console.log("Creating task: ", task);
      // Add actual task creation logic here
    };

    const onDragStart = (event: DragStartEvent) => {
        // Implementation remains the same
    };

    const onDragEnd = (event: DragEndEvent) => {
        // Implementation remains the same
    };

    return (
        <div className="kanban-board">
            <DndContext sensors={sensors} onDragStart={onDragStart} onDragEnd={onDragEnd}>
                <SortableContext items={columns.map(col => col.id)}>
                    {columns.map((col) => (
                        <KanbanColumn
                            key={col.id.toString()}
                            column={col}
                            onColumnDelete={handleColumnDelete}
                            onTaskCreate={handleTaskCreate}
                        />
                    ))}
                </SortableContext>
                {createPortal(<DragOverlay />, document.body)}
            </DndContext>
            <button onClick={() => createNewColumn("New Column Title")}>
        <PlusIcon /> Add Goal
      </button>
        </div>
    );
}

export default KanbanBoard;
