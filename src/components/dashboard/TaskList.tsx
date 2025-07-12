import type { Task } from "../../types/Task";
import TaskCard from "./TaskCard";

interface TaskListProps {
  tasks: Task[];
  onSelect: (task: Task) => void;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, onSelect }) => {
  if (tasks.length === 0) {
    return (
      <div className="empty-state">
        <h2>No tasks found</h2>
        <p>You can create a task to get started!</p>
      </div>
    );
  }

  return (
    <section className="task-list">
      {tasks.map((task) => (
        <TaskCard key={task.id} task={task} onClick={() => onSelect(task)} />
      ))}
    </section>
  );
};

export default TaskList;
