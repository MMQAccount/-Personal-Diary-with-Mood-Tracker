import { NavLink } from "react-router";
import logo from "../../assets/logo.webp";
import diary_logo from "../../assets/diary.png";
import "./Header.css";
import {
  LineChartOutlined,
  SettingOutlined,
  WechatWorkOutlined,
} from "@ant-design/icons";
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
          <img src={diary_logo} className="navlink" />
        </NavLink>
        <NavLink
          className={({ isActive }) => (isActive ? "active" : "")}
          to={`/quotesPage`}
        >
          <WechatWorkOutlined className="navlink" />
        </NavLink>
        <NavLink
          className={({ isActive }) => (isActive ? "active" : "")}
          to={`/statisticsPage`}
        >
          <LineChartOutlined className="navlink" />
        </NavLink>
        <NavLink
          className={({ isActive }) => (isActive ? "active" : "")}
          to={`/settingPage`}
        >
          <SettingOutlined className="navlink" />
        </NavLink>
      </nav>
    </header>
  );
};
export default Header;
