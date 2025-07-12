import type { Task } from "../../types/Task";

interface TaskCardProps {
  task: Task;
  onClick: () => void;
}

function getDaysLeft(dateString: string): number {
  const due = new Date(dateString).getTime();
  const now = Date.now();
  const diff = due - now;
  return Math.max(Math.ceil(diff / (1000 * 60 * 60 * 24)), 0);
}

const TaskCard: React.FC<TaskCardProps> = ({ task, onClick }) => {
  return (
    <div className="task-card" onClick={onClick}>
      <div className="task-title">{task.title}</div>
      <div className="task-meta">
        <span className="badge status">{task.status}</span>
        <span className={`badge priority ${task.priority.toLowerCase()}`}>
          {task.priority}
        </span>
        <span className="badge due">{getDaysLeft(task.dueDate)} days left</span>
      </div>
      <div className="progress-bar">
        <div
          className="progress"
          style={{ width: `${task.percentComplete}%` }}
        />
      </div>
    </div>
  );
};

export default TaskCard;
