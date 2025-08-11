import { NavLink } from "react-router-dom";
import logo from "../../assets/dino2.png";
import diary_logo from "../../assets/diary.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChartLine, faFilePen, faGear, faQuoteLeft } from "@fortawesome/free-solid-svg-icons";

import "./Header.css";


const Header = () => {
  return (
    <header className="nav_container">
      <nav>
        <NavLink className="homePage" to={`/`}>
          <img src={logo} />
        </NavLink>
        <NavLink
          className={({ isActive }) => (isActive ? "active" : "")}
          to={`/diaryPage`}
        >
          <FontAwesomeIcon icon={faFilePen} className="navlink" />
        </NavLink>
        <NavLink
          className={({ isActive }) => (isActive ? "active" : "")}
          to={`/statisticsPage`}
        >
          <FontAwesomeIcon icon={faChartLine} className="navlink" />
        </NavLink>
        <NavLink
          className={({ isActive }) => (isActive ? "active" : "")}
          to={`/quotesPage`}
        >
          <FontAwesomeIcon icon={faQuoteLeft} className="navlink" />
        </NavLink>

        <NavLink
          className={({ isActive }) => (isActive ? "active" : "")}
          to={`/settings`}
        >
          <FontAwesomeIcon icon={faGear} className="navlink" />
        </NavLink>
      </nav>
    </header>
  );
};

export default Header;