import "./HomePage.css";
import logo from "../../assets/logo.webp";
import { useNavigate, useLocation } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const showLoginButton = location.pathname !== "/login";

  return (
    <div className="container_diary">
      {showLoginButton && (
        <button className="login-button2" onClick={() => navigate("/login")}>
          Login
        </button>
      )}
      <div className="left_div">
        <h1>reflecty</h1>
        <div className="greeting">
          <h2>Hello, beautiful mind.</h2>
          <p>Take a deep breath and let's reflect together.</p>
        </div>
      </div>
      <div className="right_div">
        <img src={logo} alt="Reflectly Logo" />
        <h1>Reflectly - A Journal for Happiness,</h1>
        <h3>
          Reflectly is a journal utilizing artificial intelligence to help you
          structure and reflect upon your daily thoughts and problems.
        </h3>
      </div>
    </div>
  );
};

export default HomePage;
