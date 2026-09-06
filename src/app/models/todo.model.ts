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
