import { useAuth0 } from "@auth0/auth0-react";
import "./AuthButton.css";

const LoginButton: React.FC = () => {
  const { loginWithRedirect, isAuthenticated } = useAuth0();

  const handleLogin = async () => {
    await loginWithRedirect({
      appState: { returnTo: "/dashboard" },
      authorizationParams: { prompt: "login" },
    });
  };

  if (!isAuthenticated) {
    return (
      <button onClick={handleLogin} className="auth-button login-button">
        Log In
      </button>
    );
  }

  return null;
};

export default LoginButton;
