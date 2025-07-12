export type TaskPriority = "Low" | "Medium" | "High";
export type TaskStatus = "To Do" | "In Progress" | "In Review" | "Completed";

export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  dueDate: string;
  tags?: string[];
  percentComplete: number;
}
