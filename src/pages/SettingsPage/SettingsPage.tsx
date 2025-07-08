import { useState } from "react";
import "./SettingsPage.css";
import { useTheme } from "../../utils/ThemeContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave, faEdit } from "@fortawesome/free-solid-svg-icons";

type Theme = "light" | "dark";

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  selectedColor: string;
  setSelectedColor: (color: string) => void;
}

interface ColorOption {
  name: string;
  light: string;
  dark: string;
}

const colorOptions: ColorOption[] = [
  { name: "Default", light: "", dark: "" },
  { name: "Yellow", light: "#f1c40f", dark: "#4d4600" },
  { name: "Purple", light: "#9b59b6", dark: "#2c145a" },
];

const SettingsPage = () => {
  const {
    theme,
    toggleTheme,
    selectedColor,
    setSelectedColor,
  }: ThemeContextType = useTheme();

  const [name, setName] = useState<string>("Mariam");
  const [avatar, setAvatar] = useState<string>(
    "https://api.dicebear.com/6.x/adventurer/svg?seed=girl"
  );
  const [email, setEmail] = useState<string>("237510@ppu.edu.ps");
  const [password, setPassword] = useState<string>("Mariam@123456789");

  const handleSave = (): void => {
    alert("✅ Saved! (Just fake for now Hhh)");
  };

  return (
    <div className="settings-page">
      <h2 className="settings-title">Settings</h2>

      <div className="theme-section">
        <button className="theme-toggle" onClick={toggleTheme}>
          {theme === "light" ? "Dark Mode" : "Light Mode"}
        </button>

        <p className="color-label">Choose a primary theme color:</p>
        <div className="color-options">
          {colorOptions.map((color: ColorOption) => {
            const isSelected =
              selectedColor === color.name ||
              (color.name === "Default" && selectedColor === "");

            const isDefault = color.name === "Default";
            const backgroundColor =
              theme === "light" ? color.light : color.dark;

            return (
              <button
                key={color.name}
                className={`color-btn ${isSelected ? "selected" : ""} ${
                  isDefault ? "default-color" : ""
                }`}
                title={color.name}
                style={!isDefault ? { backgroundColor } : undefined}
                onClick={() => setSelectedColor(isDefault ? "" : color.name)}
              />
            );
          })}
        </div>
      </div>

      <div className="profile-section">
        <img
          className="profile-avatar"
          src={avatar || "https://via.placeholder.com/120"}
          alt="Avatar"
        />

        <div className="input-group">
          <label>Avatar URL (optional)</label>
          <div className="input-edit-wrapper">
            <input
              type="text"
              value={avatar}
              onChange={(e) => setAvatar(e.target.value)}
              placeholder="https://your-image-url.com"
            />
            <button className="edit-btn" title="Edit">
              <FontAwesomeIcon icon={faEdit} />
            </button>
          </div>
        </div>

        <div className="input-group">
          <label>Full Name</label>
          <div className="input-edit-wrapper">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your Name"
            />
            <button className="edit-btn" title="Edit">
              <FontAwesomeIcon icon={faEdit} />
            </button>
          </div>
        </div>

        <div className="input-group">
          <label>Email Address</label>
          <div className="input-edit-wrapper">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
            />
            <button className="edit-btn" title="Edit">
              <FontAwesomeIcon icon={faEdit} />
            </button>
          </div>
        </div>

        <div className="input-group">
          <label>Password</label>
          <div className="input-edit-wrapper">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
            />
            <button className="edit-btn" title="Edit">
              <FontAwesomeIcon icon={faEdit} />
            </button>
          </div>
        </div>

        <button className="save-btn" onClick={handleSave}>
          <FontAwesomeIcon icon={faSave} className="save-icon" />
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default SettingsPage;
