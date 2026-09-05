export enum Priority {
  high,
  medium,
  low
}

export interface Todo {
  title: string;
  description: string;
  priority: Priority;
  isDone: boolean;
  createdAt: Date;
}
