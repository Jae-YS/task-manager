import { useState } from "react";
import type { ReactNode } from "react";
import TaskContext from "./TaskContext";
import type { Task } from "../types/Task";
import { mockTasks } from "../mock/tasks";

interface Props {
  children: ReactNode;
}

const TaskProvider: React.FC<Props> = ({ children }) => {
  console.log("TaskProvider initialized with mock tasks:", mockTasks);
  const [tasks, setTasks] = useState<Task[]>(mockTasks);

  return (
    <TaskContext.Provider value={{ tasks, setTasks }}>
      {children}
    </TaskContext.Provider>
  );
};

export default TaskProvider;
