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

export const createDefaultTodo = (): Todo => {
  return {
    description: '',
    priority: Priority.Medium,
    checked: false,
    id: new Date().getTime(),
  };
};
