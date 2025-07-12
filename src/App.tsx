import React from "react";
import { Route, Routes } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import AuthenticationGuard from "./guards/AuthenticationGuard";
import HomePage from "./pages/homepage/HomePage";
import CallbackPage from "./pages/auth/CallBackPage";
import DashboardPage from "./pages/dashboard/DashboardPage";
import TaskCreatePage from "./pages/taskcreate/TaskCreatePage";
import ProfilePage from "./pages/profile/ProfilePage";
import NotFoundPage from "./pages/notfound/NotFoundPage";
import UserProvider from "./context/UserProvider";
import TaskProvider from "./context/TaskProvider";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DotLoader from "react-spinners/DotLoader";

const App: React.FC = () => {
  const { isLoading } = useAuth0();

  if (isLoading) {
    return (
      <div className="app-loading">
        <DotLoader size={80} color="#3a2e28" />
      </div>
    );
  }

  return (
    <UserProvider>
      <TaskProvider>
        <ToastContainer position="bottom-right" autoClose={3000} />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/dashboard"
            element={<AuthenticationGuard component={DashboardPage} />}
          />
          <Route path="/callback" element={<CallbackPage />} />

          <Route
            path="/task/create"
            element={<AuthenticationGuard component={TaskCreatePage} />}
          />
          <Route
            path="/profile"
            element={<AuthenticationGuard component={ProfilePage} />}
          />

          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </TaskProvider>
    </UserProvider>
  );
};

export default App;
