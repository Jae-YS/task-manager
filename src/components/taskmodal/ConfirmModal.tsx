import "./ConfirmModal.css";

interface ConfirmModalProps {
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({
  message,
  onConfirm,
  onCancel,
}) => (
  <div className="confirm-overlay">
    <div className="confirm-modal">
      <p>{message}</p>
      <div className="actions">
        <button onClick={onCancel}>Cancel</button>
        <button onClick={onConfirm} className="danger">
          Delete
        </button>
      </div>
    </div>
  </div>
);

export default ConfirmModal;
