import { useMemo } from "react";
import type { Task } from "../types/Task";


interface Filters {
  status: string;
  priority: string;
  dueDateSort: string;
}

const useFilteredTasks = (tasks: Task[], filters: Filters) => {
  const { status, priority, dueDateSort } = filters;

  return useMemo(() => {
    let filtered = [...tasks];

    if (status) filtered = filtered.filter((t) => t.status === status);
    if (priority) filtered = filtered.filter((t) => t.priority === priority);
    if (dueDateSort === "asc") {
      filtered.sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime());
    } else if (dueDateSort === "desc") {
      filtered.sort((a, b) => new Date(b.dueDate).getTime() - new Date(a.dueDate).getTime());
    }

    return filtered;
  }, [tasks, status, priority, dueDateSort]);
};

export default useFilteredTasks;
