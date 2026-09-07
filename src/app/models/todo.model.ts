export enum Priority {
  Critical = 'critical',
  High = 'high',
  Medium = 'medium',
  Low = 'low',
}

export interface Todo {
  id: number;
  description: string;
  priority: Priority;
  checked: boolean;
}

export const DefaultTodo: Todo = {
  id: new Date().getTime(),
  description: '',
  priority: Priority.Medium,
  checked: false,
};
