import { useContext } from "react";
import TaskContext from "../context/TaskContext";

const useTasks = () => {
  const context = useContext(TaskContext);
  console.log("useTasks context:", context);
  if (!context) throw new Error("useTasks must be used inside TaskProvider");
  return context;
};

export default useTasks;
