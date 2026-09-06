export enum Priority {
  critical = 'critical',
  high = 'high',
  medium = 'medium',
  low = 'low',
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
