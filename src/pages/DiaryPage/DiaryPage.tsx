import React, { useContext, useEffect, useState } from "react";
import "./DiaryPage.css";
import { useTranslation } from "react-i18next";
import { PlusOutlined, SearchOutlined } from "@ant-design/icons";
import { Input } from "antd";
import { useNavigate } from "react-router-dom";
import { DiaryContext } from "../../providers/diary-provider";
import Day from "../../components/Day/Day";
import useDays from "../../hooks/useDays.hook";
import useSearch from "../../hooks/useSearch.hook";
import useSearchType from "../../hooks/useSearchType.hook";
import useSearchByMood from "../../hooks/useSearchByMood.hook";
import { useTheme } from "../../utils/ThemeContext";
import { FaMoon, FaSun } from "react-icons/fa";
import { TagsContext } from "../../providers/tag-providor";
import { useUserData } from "../../providers/user-provider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { nameToIcon } from "../../components/MoodLineChart/MoodLineChart";
import { faQuestionCircle } from "@fortawesome/free-regular-svg-icons";
import { customMoodNumbersMap } from "../../constants/mood-no";

interface ISearchForm {
  type: string[];
}

const DiaryPage = () => {
  const { t, i18n } = useTranslation("diary");
  const { theme, toggleTheme } = useTheme();
  const { DiaryDays } = useDays();
  const { handleSearchByType, searchResultsByType } = useSearchType();
  const { handleSearch, searchResults } = useSearch();
  const navigate = useNavigate();
  const { diary, loadDiaries } = useContext(DiaryContext);
  const [open, setOpen] = useState(false);
  const { handleSearchByMood, searchResultsByMood } = useSearchByMood();
  const [form, setForm] = useState<ISearchForm>({ type: [] });
  const [selectedMood, setSelectedMood] = useState("");
  const [selectedMoodNumber, setSelectedMoodNumber] = useState<number | null>(null);
  const { tags } = useContext(TagsContext);

  useEffect(() => {
    document.body.classList.toggle("rtl", i18n.language === "ar");
  }, [i18n.language]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");

    if (!token || !userId) {
      alert("You have to login");
      navigate("/login");
    } else {
      loadDiaries();
    }
  }, [navigate]);

  useEffect(() => {
    document.documentElement.dir = i18n.language === "ar" ? "rtl" : "ltr";

    const onLangChanged = (lng: string) => {
      document.documentElement.dir = lng === "ar" ? "rtl" : "ltr";
    };

    i18n.on("languageChanged", onLangChanged);
    return () => i18n.off("languageChanged", onLangChanged);
  }, []);

  const options = [
    { label: t("input"), value: "input" },
    { label: t("voice"), value: "voice" },
    { label: t("image"), value: "image" },
    { label: t("mood_option"), value: "mood" },
  ];

  const handleChangeInput = (value: string) => {
    if (value === "input") navigate("/diaryForm");
    else if (value === "voice") navigate("/diaryVoice");
    else if (value === "image") navigate("/diaryImage");
    else if (value === "mood") navigate("/diaryMood");
  };

  const handleSelect = (value: string) => {
    handleChangeInput(value);
    setOpen(false);
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    setForm((prevForm) => {
      const updatedTypes = checked
        ? [...prevForm.type, value]
        : prevForm.type.filter((t) => t !== value);
      return { ...prevForm, type: updatedTypes };
    });
  };

  const handleSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleSearch(e);
  };

  useEffect(() => {
    handleSearchByType(form.type);
  }, [form]);

  const { user } = useUserData();
  const emojis = user?.customMoodEmojis ?? {};

  const moodKeys = Object.keys(emojis);

  const onMoodChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const moodKey = e.target.value;
    setSelectedMood(moodKey);

    const moodNumber = customMoodNumbersMap[moodKey];
    setSelectedMoodNumber(moodNumber ?? null);

    if (moodNumber !== undefined) {
      handleSearchByMood(moodNumber);
    }
  };

  return (
    <div className="diary_container">
      <button className="theme-icon-btn2" onClick={toggleTheme} title={t("toggle_theme")}>
        {theme === "light" ? <FaMoon /> : <FaSun />}
      </button>

      <div className="search_container">
        <h1>{t("welcome")}</h1>

        <div className="diary_type">
          <div className="select-header" onClick={() => setOpen(!open)}>
            <PlusOutlined />
          </div>

          {open && (
            <ul className="select-options">
              {options.map((opt) => (
                <li key={opt.value} onClick={() => handleSelect(opt.value)}>
                  {opt.label}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <div className="check">
        <div className="input_wrapper">
          <Input
            placeholder={t("search_placeholder")}
            prefix={<SearchOutlined className="icon" />}
            className="search_input"
            onChange={handleSearchInput}
          />
        </div>

        <div className="filter_by_tag">
          {tags.map((tag: ITag) => (
            <label key={tag._id} className="checkbox-label">
              <input
                type="checkbox"
                value={tag._id}
                onChange={handleCheckboxChange}
                hidden
                checked={form.type.includes(tag._id)}
              />
              <span className={form.type.includes(tag._id) ? "checked_span" : ""}>
                {t(tag.name)}
              </span>
            </label>
          ))}

          <div className="display_mood_search">
            <select
              className="search_mood"
              onChange={onMoodChange}
              value={selectedMood}

            >
              <option value="">{t("mood")}</option>
              {moodKeys.map((moodKey, idx) => (
                <option key={idx} value={moodKey}>
                  {moodKey}
                </option>
              ))}
            </select>
            {selectedMood && (
              <span style={{fontSize:"23px", marginTop:"-4px"}}>
                <FontAwesomeIcon
                  icon={nameToIcon[emojis[selectedMood]] ?? faQuestionCircle}
                  style={{ marginLeft: 8 }}
                />
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="diarys">
        {searchResults.length > 0 ? (
          searchResults.map((d) => <Day key={d.id} id={d.id} />)
        ) : searchResultsByMood.length > 0 && selectedMoodNumber !== null ? (
          searchResultsByMood.map((d) => <Day key={d.id} id={d.id} />)
        ) : selectedMoodNumber !== null ? (
          <h2>{t("no_result")}</h2>
        ) : searchResultsByType.length > 0 ? (
          searchResultsByType.map((d) => <Day key={d.id} id={d.id} />)
        ) : form.type.length !== 0 ? (
          <h2>{t("no_result")}</h2>
        ) : diary.length > 0 ? (
          DiaryDays.map((d) => <Day key={d} id={d} />)
        ) : (
          <h3>{t("cant_find")}</h3>
        )}
      </div>
    </div>
  );
};

export default DiaryPage;
