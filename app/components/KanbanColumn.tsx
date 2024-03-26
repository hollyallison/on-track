import { useState, useEffect } from "react";
import TrashIcon from "../icons/TrashIcon";
import PlusIcon from "../icons/PlusIcon";
import KanbanTask from "./KanbanTask"; // Your task component
import { Task, Column,} from '../task';
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";

interface Props {
  column: Column;
  onColumnUpdate: () => void; // Callback for parent component to handle updates
}

function ColumnContainer({ column, onColumnUpdate }: Props) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    // Fetch tasks when the component mounts or the column changes
    const fetchTasks = async () => {
      const response = await fetch(`/api/tasks?columnId=${column.id}`);
      const data = await response.json();
      if (data.success) {
        setTasks(data.data);
      }
    };
    fetchTasks();
  }, [column]);

  // Sensors for drag and drop
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor)
  );

  const handleDragEnd = ({ active, over }) => {
    if (active.id !== over.id) {
      const oldIndex = tasks.findIndex(task => task.id === active.id);
      const newIndex = tasks.findIndex(task => task.id === over.id);

      const newTasks = arrayMove(tasks, oldIndex, newIndex);
      setTasks(newTasks);
      // Here you could also update the order in the backend
    }
  };

  const createTask = async () => {
    const response = await fetch('/api/tasks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ columnId: column.id, content: "New Task" }), // Adjust based on your task model
    });
    const newTask = await response.json();
    if (newTask.success) {
      setTasks([...tasks, newTask.data]);
    }
  };

  return (
    <div className="bg-gray-50 w-[350px] h-auto max-h-[800px] rounded-md flex flex-col p-4">
      <div className="flex items-center justify-between mb-4">
        {!editMode ? (
          <h2 onClick={() => setEditMode(true)} className="text-xl font-bold">{column.title}</h2>
        ) : (
          <input
            type="text"
            defaultValue={column.title}
            onBlur={(e) => {
              setEditMode(false);
              // Update column title here
            }}
            autoFocus
            className="text-xl font-bold"
          />
        )}
        <button onClick={createTask} title="Add task">
          <PlusIcon />
        </button>
      </div>

      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={tasks.map(task => task.id)} strategy={verticalListSortingStrategy}>
          {tasks.map((task) => (
            <KanbanTask key={task.id} task={task} />
          ))}
        </SortableContext>
      </DndContext>

      <button onClick={() => {/* handle delete column */}} title="Delete column">
        <TrashIcon />
      </button>
    </div>
  );
}

export default ColumnContainer;
