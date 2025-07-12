import { useState, useEffect } from "react";
import PageLayout from "../../layout/PageLayout";
import useTasks from "../../hooks/useTask";
import useUser from "../../hooks/useUser";
import TaskModal from "../../components/taskmodal/TaskModal";
import FilterBar from "../../components/dashboard/FilterBar";
import TaskList from "../../components/dashboard/TaskList";
import PaginationControls from "../../components/dashboard/PaginationControls";
import "./DashboardPage.css";
import useFilteredTasks from "../../hooks/useFilteredTasks";
import type { Task } from "../../types/Task";
import { toast } from "react-toastify";
import ConfirmModal from "../../components/taskmodal/ConfirmModal";
const TASKS_PER_PAGE = 4;

const DashboardPage: React.FC = () => {
  const { tasks, setTasks } = useTasks();
  const { user } = useUser();

  const [showConfirm, setShowConfirm] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState<Task | null>(null);

  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const [activeDropdown, setActiveDropdown] = useState<
    "" | "status" | "priority" | "due-date"
  >("");
  const [statusFilter, setStatusFilter] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("");
  const [dueDateSort, setDueDateSort] = useState("");

  const handleSave = (updatedTask: Task) => {
    setTasks((prev) =>
      prev.map((task) => (task.id === updatedTask.id ? updatedTask : task))
    );
    toast.success("Task updated!");
    setSelectedTask(null);
  };

  const confirmDelete = (task: Task) => {
    setTaskToDelete(task);
    setShowConfirm(true);
  };

  const handleConfirmedDelete = () => {
    if (taskToDelete) {
      setTasks((prev) => prev.filter((t) => t.id !== taskToDelete.id));
      toast.info("Task deleted.");
      setTaskToDelete(null);
      setShowConfirm(false);
      setSelectedTask(null);
    }
  };
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest(".filter-dropdown")) {
        setActiveDropdown("");
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const filteredTasks = useFilteredTasks(tasks, {
    status: statusFilter,
    priority: priorityFilter,
    dueDateSort,
  });

  const totalPages = Math.ceil(filteredTasks.length / TASKS_PER_PAGE);
  const paginatedTasks = filteredTasks.slice(
    (currentPage - 1) * TASKS_PER_PAGE,
    currentPage * TASKS_PER_PAGE
  );

  return (
    <PageLayout>
      <header className="dashboard-header">
        <div>
          <h1>Welcome{user?.given_name ? `, ${user.given_name}` : ""}</h1>
          <p className="dashboard-subheading">Here's your task summary:</p>
        </div>
      </header>

      <FilterBar
        activeDropdown={activeDropdown}
        setActiveDropdown={(key: string) =>
          setActiveDropdown(key as "" | "status" | "priority" | "due-date")
        }
        setStatusFilter={setStatusFilter}
        setPriorityFilter={setPriorityFilter}
        setDueDateSort={setDueDateSort}
        clearFilters={() => {
          setStatusFilter("");
          setPriorityFilter("");
          setDueDateSort("");
          setActiveDropdown("");
        }}
      />

      <TaskList tasks={paginatedTasks} onSelect={setSelectedTask} />

      <PaginationControls
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />

      {selectedTask && (
        <TaskModal
          task={selectedTask}
          onClose={() => setSelectedTask(null)}
          onSave={handleSave}
          onDelete={() => confirmDelete(selectedTask)}
        />
      )}
      {showConfirm && taskToDelete && (
        <ConfirmModal
          message={`Are you sure you want to delete "${taskToDelete.title}"?`}
          onConfirm={handleConfirmedDelete}
          onCancel={() => setShowConfirm(false)}
        />
      )}
    </PageLayout>
  );
};

export default DashboardPage;
