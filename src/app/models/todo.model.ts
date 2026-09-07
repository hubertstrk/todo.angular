export enum Priority {
  Critical = 'critical',
  High = 'high',
  Medium = 'medium',
  Low = 'low',
}

export interface Todo {
  id: number;
  title: string;
  description: string;
  priority: Priority;
  checked: boolean;
}

export const DefaultTodo: Todo = {
  id: new Date().getTime(),
  title: '',
  description: '',
  priority: Priority.Medium,
  checked: false,
};
