import { useEffect, useContext, useState } from "react";
import "./SettingsPage.css";
import { useTheme } from "../../utils/ThemeContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave} from "@fortawesome/free-solid-svg-icons";
import { updateUser } from "../../services/user.service";
import { getUserById } from "../../services/user.service";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
import { useUserData } from "../../providers/user-provider";
import { useNavigate } from "react-router";
import { nameToIcon } from "../../components/MoodLineChart/MoodLineChart";

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
  { name: "Purple", light: "#9b59b6", dark: "#2c145a" },
];


const SettingsPage = () => {

  const navigate = useNavigate();

  const { tags, updateTags } = useContext(TagsContext);
  const { t, i18n } = useTranslation("diary");
  const {
    theme,
    toggleTheme,
    selectedColor,
    setSelectedColor,
  }: ThemeContextType = useTheme();

  const { refreshUser, user } = useUserData();

  const [name, setName] = useState<string>("");
  const [avatar, setAvatar] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [currentPassword, setCurrentPassword] = useState<string>("");


useEffect(() => {
  const fetchUserData = async () => {
    const userId = localStorage.getItem("userId");
    const token = localStorage.getItem("token");

    if (!userId || !token) {
      toast.error("User not authenticated. Please login.");
      setTimeout(() => navigate("/login"), 3000);
      return;
    }

    try {
      const data = await getUserById(userId); 

      setName(data.data.name || "");
      setEmail(data.data.email || "");
      setAvatar(
        data.data.imageURL ||
        "https://api.dicebear.com/6.x/adventurer/svg?seed=girl"
      );

      setPassword(""); 
    } catch (error: any) {
      toast.error(`⚠️ Failed to load user data: ${error.message}`, {
        toastId: "loadUserError",
      });

      localStorage.removeItem("userId");
      localStorage.removeItem("token");

      setTimeout(() => {
        navigate("/login");
      }, 3000);
    }
  };

  fetchUserData();
}, []);


  const availableMoodIcons: Record<string, IconDefinition[]> = {
    Delighted: [faGrinStars, faLaughBeam, faGrinHearts],
    Happy: [faSmileBeam, faLaugh, faGrinWink, faFaceGrinWide],
    Neutral: [faMeh, faMehBlank, faSmile],
    Sad: [faSadTear, faTired, faFrown],
    Miserable: [faAngry, faSadCry, faFaceRollingEyes, faGrimace, faDizzy],
  };

  const [moodIcons, setMoodIcons] = useState<Record<string, IconDefinition>>({
    Delighted: nameToIcon[user?.customMoodEmojis.delighted || "face-grin-stars"],
    Happy: nameToIcon[user?.customMoodEmojis.happy || "face-smile-beam"],
    Neutral: nameToIcon[user?.customMoodEmojis.neutral || "face-smile"],
    Sad: nameToIcon[user?.customMoodEmojis.sad || "face-frown"],
    Miserable: nameToIcon[user?.customMoodEmojis.miserable || "face-sad-cry"],
  });

  const handleMoodChange = async (mood: string, newIconName: string) => {

    const userId = localStorage.getItem("userId");
    const token = localStorage.getItem("token");

    if (!userId || !token) {
      toast.error("User not authenticated. Please login.");
      setTimeout(() => navigate("/login"), 3000);
      return;
    }
    await updateUser(userId, {
      moods: {
        [mood.toLocaleLowerCase()]: newIconName,
      }
    })

    await refreshUser({ userChanged: true });
    const icon = availableMoodIcons[mood].find(
      (icon) => icon.iconName === newIconName
    );
    if (icon) {
      setMoodIcons((prev) => ({ ...prev, [mood]: icon }));
    }
  };
  const [localTags, setLocalTags] = useState<ITag[]>([]);
  useEffect(() => {
    setLocalTags(tags);
  }, [tags]);

  const handleTagChange = async (id: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const newName = e.target.value;

    setLocalTags((prev) =>
      prev.map((tag) => (tag._id === id ? { ...tag, name: newName } : tag))
    );

    try {
      await updateTags(id, newName);

    } catch (error) {
      console.error("Failed to update tag", error);
    }
  };

 const handleSave = async () => {
  try {
    const userId = localStorage.getItem("userId");
    const token = localStorage.getItem("token");

    if (!userId || !token) {
      toast.error("User not authenticated. Please login.");
      return;
    }

    const updatedData: any = { name, email, imageURL: avatar };

    if (password) {
      if (!currentPassword) {
        toast.error("Please enter your current password to change the password.");
        return;
      }
      updatedData.password = password;
      updatedData.currentPassword = currentPassword;
    }

    await updateUser(userId!, updatedData);
    await refreshUser({ userChanged: true });

    toast.success("User updated successfully!");

    setPassword("");
    setCurrentPassword("");

  } catch (error: any) {
    toast.error(`Error: ${error.message}`);
  }
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
          <label>Full Name</label>
          <div className="input-edit-wrapper">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your Name"
            />
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
          </div>
        </div>

        <div className="input-group">
          <label>Avatar URL</label>
          <div className="input-edit-wrapper">
            <input
              type="text"
              value={avatar}
              onChange={(e) => setAvatar(e.target.value)}
              placeholder="https://your-image-url.com"
            />
          </div>
        </div>

        <hr className="separator" />
        <p className="password-note">If you want to change your password, please enter your current and new password below:</p>
        <div className="input-group">
          <label>Current Password</label>
          <div className="input-edit-wrapper">
            <input
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              placeholder="Current Password"
            />
            
          </div>
        </div>

        <div className="input-group">
          <label>New Password</label>
          <div className="input-edit-wrapper">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="New Password"
            />
          </div>
        </div>

        <button className="lang" onClick={toggleLanguage}>
          {t("toggleLang")}
        </button>
        <hr className="separator" />
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
        <hr className="separator" />
        <div className="mood-customization">
          <h3>Customize Tag Icons</h3>
          {localTags.map((t, index) => (
            <input
              key={t._id}
              type="text"
              value={t.name}
              onChange={(e) => handleTagChange(t._id, e)}
            />
          ))}
        </div>

        <button className="save-btn" onClick={handleSave}>
          <FontAwesomeIcon icon={faSave} className="save-icon" />
          Save Changes
        </button>
        <ToastContainer
          position="top-center"
          autoClose={3000}
          hideProgressBar={false}
          closeOnClick
          pauseOnHover
          draggable
          rtl={i18n.language === "ar"}
          theme="colored"
        />
      </div>
    </div>
  );
};

export default SettingsPage;