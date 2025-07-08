import "./HomePage.css";
import logo from "../../assets/dino2.png";
import { useNavigate, useLocation } from "react-router-dom";
import { useTheme } from "../../utils/ThemeContext";
import { FaMoon, FaSun } from "react-icons/fa";
import { useUser } from "../../utils/UserContext";
import userIcon from "../../assets/icon.png";

<img src={userIcon} alt="User Icon" />;

const HomePage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();
  const { user, logout } = useUser();

  const showLoginButton = location.pathname !== "/login" && !user;

  return (
    <div className="container_diary">
      {showLoginButton && (
        <button className="login-button2" onClick={() => navigate("/login")}>
          Login
        </button>
      )}
      {user && (
        <>
          <button className="logout-button" onClick={logout}>
            Logout
          </button>
        </>
      )}

      <button className="theme-icon-btn" onClick={toggleTheme}>
        {theme === "light" ? <FaMoon /> : <FaSun />}
      </button>
      <div className="left_div">
        <h1>reflecty</h1>
        <div className="reflectly_container">
          <img src={logo} alt="" />
          <h2>Hello, beautiful mind.</h2>
          <p>Take a deep breath and let's reflect together.</p>
        </div>
      </div>
      <div className="right_div">
        <div className="greeting">
          <h1>Reflectly-A Jornal for Happiness,</h1>
          <h3>
            Reflectly is a journal utilizing artificial intelligence to help you
            structure and reflect upon your daily thoughts and problems.
          </h3>
        </div>
      </div>
    </div>
  );
};
export default HomePage;
