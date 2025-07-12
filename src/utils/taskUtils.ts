import type { Task } from "../types/Task";

export const getTaskById = (tasks: Task[], id: string) =>
  tasks.find((task) => task.id === id);