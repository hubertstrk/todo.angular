export enum Priority {
  high,
  medium,
  low,
}

export interface Todo {
  title: string;
  description: string;
  priority: Priority;
  checked: boolean;
  createdAt: Date;
}

export const DefaultTodo: Todo = {
  title: '',
  description: '',
  priority: Priority.medium,
  checked: false,
  createdAt: new Date(),
};
