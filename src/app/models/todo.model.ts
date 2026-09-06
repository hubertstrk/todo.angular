export enum Priority {
  Critical = 'critical',
  High = 'high',
  Medium = 'medium',
  Low = 'low',
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
  priority: Priority.Medium,
  checked: false,
  createdAt: new Date(),
};
