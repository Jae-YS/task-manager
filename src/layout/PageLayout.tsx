import NavBar from "../components/navbar/Navbar";
import "./PageLayout.css";

type PageLayoutProps = {
  children?: React.ReactNode;
};

const PageLayout: React.FC<PageLayoutProps> = ({ children }) => {
  return (
    <div className="page-layout">
      <NavBar />

      <main className="page-main">{children}</main>

      <footer className="page-footer">
        &copy; {new Date().getFullYear()} Task Manager App
      </footer>
    </div>
  );
};

export default PageLayout;
