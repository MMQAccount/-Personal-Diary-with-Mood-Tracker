import { useContext, useState, useTransition } from "react";
import "./SettingsPage.css";
import { useTheme } from "../../utils/ThemeContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave, faEdit, } from "@fortawesome/free-solid-svg-icons";

import {
  faGrinStars,
  faGrinHearts,
  faSmile,
  faFrown,
  faMeh,
  faSadTear,
  faSadCry,
  faTired,
  faAngry,
  faSmileBeam,
  faLaugh,
  faLaughBeam,
  faMehBlank,
  faFaceRollingEyes,
  faGrinWink,
  faFaceGrinWide,
  faGrimace,
  faDizzy
} from "@fortawesome/free-regular-svg-icons";
import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { TagsContext } from "../../providers/tag-providor";
import { useTranslation } from "react-i18next";

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
  const { tags, updateTags } = useContext(TagsContext);
  const { t, i18n } = useTranslation("diary");
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

  const availableMoodIcons: Record<string, IconDefinition[]> = {
    Delighted: [faGrinStars, faLaughBeam, faGrinHearts],
    Happy: [faSmileBeam, faLaugh, faGrinWink, faFaceGrinWide],
    Neutral: [faMeh, faMehBlank, faSmile],
    Sad: [faSadTear, faTired, faFrown],
    Miserable: [faAngry, faSadCry, faFaceRollingEyes, faGrimace, faDizzy],
  };

  const [moodIcons, setMoodIcons] = useState<Record<string, IconDefinition>>({
    Delighted: faGrinHearts,
    Happy: faSmileBeam,
    Neutral: faSmile,
    Sad: faFrown,
    Miserable: faSadCry,
  });

  const handleMoodChange = (mood: string, newIconName: string) => {
    const icon = availableMoodIcons[mood].find(
      (icon) => icon.iconName === newIconName
    );
    if (icon) {
      setMoodIcons((prev) => ({ ...prev, [mood]: icon }));
    }
  };

  const handleTagChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    updateTags(index, e.target.value);
  };


  const handleSave = (): void => {
    alert("✅ Saved! (Just fake for now Hhh)");
  };

  const toggleLanguage = () => {
    const newLang = i18n.language === "en" ? "ar" : "en";
    i18n.changeLanguage(newLang);
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
                className={`color-btn ${isSelected ? "selected" : ""} ${isDefault ? "default-color" : ""
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
          <label>Avatar URL</label>
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
        <button className="lang" onClick={toggleLanguage}>
          {t("toggleLang")}
        </button>
        {/* Mood Customization Section */}
        <div className="mood-customization">
          <h3>Customize Mood Icons</h3>
          {Object.entries(availableMoodIcons).map(([mood, icons]) => (
            <div key={mood} className="mood-row">
              <label>{mood}:</label>
              <select
                value={moodIcons[mood]?.iconName}
                onChange={(e) => handleMoodChange(mood, e.target.value)}
              >
                {icons.map((icon) => (
                  <option key={icon.iconName} value={icon.iconName}>
                    {icon.iconName}
                  </option>
                ))}
              </select>
              <FontAwesomeIcon icon={moodIcons[mood]} className="mood-preview" />
            </div>
          ))}
        </div>
        <div className="mood-customization">
          <h3>Customize Tag Icons</h3>
          {tags.map((t, index) => (
            <input
              key={index}
              type="text"
              defaultValue={t}
              onChange={(e) => handleTagChange(index, e)}
            />
          ))}
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
