import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";
import LoginButton from "../../components/common/authbutton/LoginButton";
import "./HomePage.css";

const HomePage: React.FC = () => {
  const { isAuthenticated } = useAuth0();

  return (
    <section className="home-hero">
      <div className="home-content">
        <h1 className="home-title">Welcome to TaskFlow</h1>
        <p className="home-subtitle">
          Organize your day, stay productive, and manage your tasks efficiently.
        </p>

        <ul className="home-benefits">
          <li className="fade-up delay-1">✔ Create and manage tasks</li>
          <li className="fade-up delay-2">✔ Track your productivity</li>
          <li className="fade-up delay-3">✔ Stay organized daily</li>
        </ul>

        <div className="home-actions fade-up delay-4">
          {isAuthenticated ? (
            <Link to="/dashboard" className="home-button primary">
              Go to Dashboard
            </Link>
          ) : (
            <LoginButton />
          )}
        </div>
      </div>
    </section>
  );
};

export default HomePage;
