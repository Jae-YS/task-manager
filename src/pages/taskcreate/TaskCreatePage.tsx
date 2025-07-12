import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useTasks from "../../hooks/useTask";
import type { Task, TaskStatus, TaskPriority } from "../../types/Task";
import "./TaskCreatePage.css";
import { toast } from "react-toastify";

const TaskCreatePage: React.FC = () => {
  const { tasks, setTasks } = useTasks();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [priority, setPriority] = useState<TaskPriority>("Medium");
  const [status, setStatus] = useState<TaskStatus>("To Do");

  const [errors, setErrors] = useState({
    title: "",
    description: "",
    dueDate: "",
  });

  const validate = (): boolean => {
    const newErrors = {
      title: title.trim() === "" ? "Title is required" : "",
      description: description.trim() === "" ? "Description is required" : "",
      dueDate: dueDate === "" ? "Due date is required" : "",
    };

    setErrors(newErrors);
    return !Object.values(newErrors).some((msg) => msg);
  };

  const handleCreate = () => {
    if (!validate()) return;

    const newTask: Task = {
      id: Date.now().toString(),
      title,
      description,
      dueDate,
      priority,
      status,
      percentComplete: 0,
    };

    setTasks([...tasks, newTask]);
    toast.success(" Task created!");
    navigate("/dashboard");
  };

  return (
    <div className="task-create-container">
      <h1>Create a New Task</h1>

      <div className="task-form">
        <label>Title</label>
        <input value={title} onChange={(e) => setTitle(e.target.value)} />
        {errors.title && <span className="form-error">{errors.title}</span>}

        <label>Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        {errors.description && (
          <span className="form-error">{errors.description}</span>
        )}

        <label>Due Date</label>
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />
        {errors.dueDate && <span className="form-error">{errors.dueDate}</span>}

        <label>Priority</label>
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value as TaskPriority)}
        >
          <option>Low</option>
          <option>Medium</option>
          <option>High</option>
        </select>

        <label>Status</label>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value as TaskStatus)}
        >
          <option>To Do</option>
          <option>In Progress</option>
          <option>In Review</option>
          <option>Done</option>
        </select>

        <div className="form-actions">
          <button onClick={() => navigate("/dashboard")}>Cancel</button>
          <button className="btn-primary" onClick={handleCreate}>
            Create Task
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskCreatePage;
