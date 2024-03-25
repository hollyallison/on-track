export type Id = string;

export interface ITask {
  id: Id;
  title: string;
  description?: string;
  status: 'To Do' | 'In Progress' | 'Done';
  content?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IColumn {
  id: Id;
  title: string;
  tasks: ITask[];
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IKanbanBoard {
  id: Id;
  name: string;
  columns: IColumn[];
  createdAt?: Date;
  updatedAt?: Date;
}
