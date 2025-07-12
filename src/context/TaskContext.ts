import { createContext } from "react";
import type { Task } from "../types/Task";

export interface TaskContextType {
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
}

const TaskContext = createContext<TaskContextType | null>(null);

export default TaskContext;
