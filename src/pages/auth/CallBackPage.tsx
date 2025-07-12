import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PageLayout from "../../layout/PageLayout";
import DotLoader from "react-spinners/DotLoader";
import "./CallBackPage.css";

const CallbackPage: React.FC = () => {
  const { isAuthenticated, isLoading, error } = useAuth0();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      navigate("/dashboard");
    }
  }, [isAuthenticated, isLoading, navigate]);

  if (error) {
    return (
      <PageLayout>
        <div className="callback-error">Oops... {error.message}</div>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <div className="callback-container">
        <DotLoader size={120} color="var(--coffee)" />
        <p className="callback-message">Logging in...</p>
      </div>
    </PageLayout>
  );
};

export default CallbackPage;
