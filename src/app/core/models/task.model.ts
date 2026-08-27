// --- Enums ---

export enum Priority {
  Low = 'LOW',
  Medium = 'MEDIUM',
  High = 'HIGH',
  Critical = 'CRITICAL',
}

export enum TaskStatus {
  Todo = 'TODO',
  InProgress = 'IN_PROGRESS',
  Done = 'DONE',
  Cancelled = 'CANCELLED',
}

// --- Interfaces ---

export interface Task {
  id: number;
  title: string;
  description: string;
  priority: Priority;
  status: TaskStatus;
  assignee: string;
  dueDate: string;       // ISO date string: 'YYYY-MM-DD'
  createdAt: string;     // ISO datetime string
  updatedAt: string;
  tags: string[];
}

// Omit auto-generated fields when creating a new task
export type CreateTaskDto = Omit<Task, 'id' | 'createdAt' | 'updatedAt'>;

// All fields optional when updating
export type UpdateTaskDto = Partial<CreateTaskDto>;
