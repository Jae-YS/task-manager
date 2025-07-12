import { useAuth0 } from "@auth0/auth0-react";
import "./AuthButton.css";

const LogoutButton: React.FC = () => {
  const { logout, isAuthenticated } = useAuth0();

  const handleLogout = () => {
    logout({ logoutParams: { returnTo: window.location.origin } });
  };

  if (isAuthenticated)
    return (
      <button onClick={handleLogout} className="auth-button logout-button">
        Log Out
      </button>
    );
  return null;
};

export default LogoutButton;
