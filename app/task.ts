export type Id = string | number;

export type Column = {
  id: Id;
  title: string;
};

export type Goal = {
  id: Id;
  title: string;
};

export type Task = {
  id: Id;
  columnId: Id;
  goalId: Id;
  content: string;
};

