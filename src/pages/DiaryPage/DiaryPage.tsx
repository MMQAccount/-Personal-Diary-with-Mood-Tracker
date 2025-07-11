import "./DiaryPage.css";
import { PlusOutlined, SearchOutlined } from "@ant-design/icons";
import { Input } from "antd";
import { useNavigate } from "react-router-dom";
import { DiaryContext } from "../../providers/diary-provider";
import { useContext, useEffect, useState } from "react";
import Day from "../../components/Day/Day";
import Diary from "../../components/Diary/Diary";
import useDays from "../../hooks/useDays.hook";
import useSearch from "../../hooks/useSearch.hook";
import useSearchType from "../../hooks/useSearchType.hook";
import useSearchByMood from "../../hooks/useSearchByMood.hook";
const DiaryPage = () => {
  const emojis = ["😭", "🙁", "😐", "☺️", "😁"];
  const { DiaryDays } = useDays();
  const { handleSearchByType, searchResultsByType } = useSearchType();
  const { handleSearch, searchResults } = useSearch();
  const navigate = useNavigate();
  const { diary } = useContext(DiaryContext);
  const [open, setOpen] = useState(false);
  const { handleSearchByMood, searchResultsByMood } = useSearchByMood();
  const INITIAL_FORM: Store.ISearchForm = {
    type: [],
  };
  const [form, setForm] = useState<Store.ISearchForm>(INITIAL_FORM);
  const [select, setSelected] = useState("");

  const handleChangeInput = (value: string) => {
    if (value === "input") navigate("/diaryForm");
    else if (value === "voice") navigate("/diaryVoice");
    else if (value === "image") navigate("/diaryImage");
    else if (value === "mood") navigate("/diaryMood");
  };

  const options = [
    { label: "input 📜", value: "input" },
    { label: "voice 🎙️", value: "voice" },
    { label: "image🖼️", value: "image" },
    { label: "mood☺️", value: "mood" },
  ];

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
  const handelSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelected(e.target.value);
    const val = Number(e.target.value);
    handleSearchByMood(val);
  };
  useEffect(() => {
    handleSearchByType(form.type);
  }, [form]);
  return (
    <div className="diary_container">
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
      <div className="search_container">
        <h1>Welcome,</h1>
        <div className="input_wrapper">
          <Input
            placeholder="Search ..."
            prefix={<SearchOutlined className="icon" />}
            className="search_input"
            onChange={handleSearch}
          />
        </div>
      </div>
      <div className="check">
        <label className="checkbox-label">
          <input
            type="checkbox"
            value="Family"
            onChange={handleCheckboxChange}
            hidden
          />
          <span className={form.type.includes("Family") ? "checked_span" : ""}>
            Family 👨‍👩‍👧‍👦
          </span>
        </label>
        <label className="checkbox-label">
          <input
            type="checkbox"
            name="Work"
            value="Work"
            onChange={handleCheckboxChange}
          />
          <span className={form.type.includes("Work") ? "checked_span" : ""}>
            Work 🏢
          </span>
        </label>
        <label className="checkbox-label">
          <input
            type="checkbox"
            name="School"
            value="School"
            onChange={handleCheckboxChange}
          />
          <span className={form.type.includes("School") ? "checked_span" : ""}>
            School 🏫
          </span>
        </label>
        <label className="checkbox-label">
          <input
            type="checkbox"
            name="Friends"
            value="Friends"
            onChange={handleCheckboxChange}
          />
          <span className={form.type.includes("Friends") ? "checked_span" : ""}>
            Friends 👥
          </span>
        </label>
        <div>
          <select
            name="mood"
            id="mood"
            className="search_mood"
            onChange={handelSelectChange}
            defaultValue={""}
          >
            <option value="">Mood</option>
            {emojis.map((emoji, index) => (
              <option key={index} value={index}>
                {emoji}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="diarys">
        {searchResults.length > 0 ? (
          searchResults.map((d) => <Day key={d.id} id={d.id} />)
        ) : searchResultsByMood.length > 0 && select !== "" ? (
          searchResultsByMood.map((d) => <Day key={d.id} id={d.id} />)
        ) : select !== "" ? (<h2>No Result</h2>) : searchResultsByType.length > 0 ? (
          searchResultsByType.map((d) => <Day key={d.id} id={d.id} />)
        ) : form.type.length !== 0 ? (<h2>No Result</h2>) : diary.length > 0 ? (
          DiaryDays.map((d) => <Day key={d} id={d} />)
        ) : (
          <h3>Can't Find Any Diary, Try To Add Some</h3>
        )}
      </div>
    </div>
  );
};

export default DiaryPage;
