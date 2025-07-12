import React, { useState } from "react";
import "./TaskModal.css";
import type { Task } from "../../types/Task";

interface TaskModalProps {
  task: Task;
  onClose: () => void;
  onSave: (updatedTask: Task) => void;
  onDelete: () => void;
}

const TaskModal: React.FC<TaskModalProps> = ({
  task,
  onClose,
  onSave,
  onDelete,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);

  const handleSave = () => {
    onSave({ ...task, title, description });
    setIsEditing(false);
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-paper" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Edit Task</h2>
          <button onClick={onDelete} className="danger">
            Delete
          </button>
        </div>

        {isEditing ? (
          <div className="modal-content">
            <input
              className="modal-input"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Task title"
            />
            <textarea
              className="modal-textarea"
              rows={5}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Task description"
            />
          </div>
        ) : (
          <div className="modal-content">
            <h3 className="modal-view-title">{title}</h3>
            <p className="modal-view-description">{description}</p>
          </div>
        )}

        <div className="modal-actions">
          <button onClick={onClose}>Close</button>
          {isEditing ? (
            <button onClick={handleSave}>Save</button>
          ) : (
            <button onClick={() => setIsEditing(true)}>Edit</button>
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskModal;
