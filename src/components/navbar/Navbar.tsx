import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";
import LoginButton from "../authbutton/LoginButton";
import LogoutButton from "../authbutton/LogoutButton";

import "./Navbar.css";

const NavBar: React.FC = () => {
  const { isAuthenticated } = useAuth0();

  return (
    <nav className="navbar" aria-label="Main navigation">
      <div className="navbar-content">
        <div className="nav-section nav-links">
          {isAuthenticated && (
            <>
              <Link to="/dashboard">Dashboard</Link>
              <Link to="/task/create">Create Task</Link>
              <Link to="/profile">Profile</Link>
            </>
          )}
        </div>

        <div className="nav-section nav-brand">
          <Link to="/" className="brand-link" aria-label="Task Manager Home">
            TaskFlow
          </Link>
        </div>

        <div className="nav-section nav-auth">
          {!isAuthenticated && <LoginButton />}
          {isAuthenticated && <LogoutButton />}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
