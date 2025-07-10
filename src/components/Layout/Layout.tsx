import { Outlet } from "react-router-dom";
import { useTheme } from "../../utils/ThemeContext";
import { FaMoon, FaSun } from "react-icons/fa";
import "./Layout.css";

const Layout = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="layout-container">
      <header className="global-navbar">
        <button className="theme-icon-btn" onClick={toggleTheme}>
          {theme === "light" ? <FaMoon /> : <FaSun />}
        </button>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
