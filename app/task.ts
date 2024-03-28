export type Id = string;

export interface Task {
  _id: Id;
  content: string;
  status: 'To Do' | 'In Progress' | 'Done';
  columnId: Id; // Links the task to a specific column.
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Column {
  _id: string;
  title: string;
  tasks: Task[];
  createdAt?: Date;
  updatedAt?: Date;
}

export interface KanbanBoard {
  _id: Id;
  name: string;
  columns: Id[]; 
  goalId: Id; 
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Goal { 
  _id: Id;
  title: string;
}
