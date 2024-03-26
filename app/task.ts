export type Id = string;

export interface Task {
  id: Id;
  title: string;
  description?: string;
  status: 'To Do' | 'In Progress' | 'Done';
  columnId: Id; // Links the task to a specific column.
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Column {
  id: Id;
  title: string;
  tasks: Task[];
  createdAt?: Date;
  updatedAt?: Date;
}

export interface KanbanBoard {
  id: Id;
  name: string;
  columns: Id[]; // Array of column IDs.
  goalId: Id; // Links the board to a specific goal.
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Goal { 
  id: Id;
  title: string;
}
