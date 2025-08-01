import React, { useContext, useEffect, useState } from "react";
import { DiaryContext } from "../../../providers/diary-provider";
import "../DiaryForm/DiaryForm.css";
import { useNavigate } from "react-router";
import { TagsContext } from "../../../providers/tag-providor";
import { useTranslation } from "react-i18next";

const DiaryMood = () => {
    const { t } = useTranslation("diary");
    const { addToDiary, updateDiary, diary } = useContext(DiaryContext);
    const navigate = useNavigate();
    useEffect(() => {
        const token = localStorage.getItem("token");
        const userId = localStorage.getItem("userId");

        if (!token || !userId) {
            alert("You have to login");
            navigate("/login");
        }
    }, [navigate]);
    const emojis = ['😭', '🙁', '😐', '☺️', '😁'];
    const stateTexts = [
        t("reallyTerrible"),
        t("somewhatBad"),
        t("completelyOkay"),
        t("prettyGood"),
        t("superAwesome"),
    ];

    const [moodValue, setMoodValue] = useState(2);
    const INITIAL_FORM: Store.IMoodForm = {
        title: "",
        type: [],
        state: 2,
    };
    const [form, setForm] = useState<Store.IMoodForm>(INITIAL_FORM);

    const handleFormChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
    ) => {
        e.preventDefault();
        let value: any = e.target.value;
        if (e.target.name === "state") {
            value = Number(value);
        }
        setForm({ ...form, [e.target.name]: value });
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const todayTimestamp = today.getTime();

        const existingIndex = diary.findIndex((d) => {
            const dDate = new Date(d.id);
            dDate.setHours(0, 0, 0, 0);
            return dDate.getTime() === todayTimestamp;
        });

        if (existingIndex !== -1) {
            const existingDiary = diary[existingIndex];
            const updatedDiary: Store.IDayDiary = {
                ...existingDiary,
                ...form,
                type: Array.from(new Set([...(existingDiary.type || []), ...(form.type || [])])),
                state: form.state,
                title: form.title,
            };

            updateDiary(existingDiary._id, updatedDiary);
        } else {
            const newDiary: Store.IDayDiaryInput = {
                id: todayTimestamp,
                ...form,
            };
            addToDiary(newDiary);
        }

        navigate("/diaryPage");
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

    const { tags } = useContext(TagsContext);

    return (
        <div className="form-wrapper">
            <form onSubmit={handleSubmit}>
                <h1>{stateTexts[moodValue]}</h1>
                <div className="mood_input">
                    <input
                        type="range"
                        min={0}
                        max={4}
                        value={moodValue}
                        className="range_input"
                        name="state"
                        onChange={(e) => {
                            const val = parseInt(e.target.value);
                            setMoodValue(val);
                            handleFormChange(e);
                        }}
                        required
                    />
                    <h1>{emojis[moodValue]}</h1>
                </div>

                <div className="check">
                    {tags.map(m => (
                        <label key={m._id} className="checkbox-label">
                            <input type="checkbox" value={m._id} onChange={handleCheckboxChange} />
                            <span className={form.type.includes(m._id) ? "checked_span" : ""}>
                                {t(m.name)}
                            </span>
                        </label>
                    ))}
                </div>
                <input
                    type="text"
                    placeholder={t("titlePlaceholder")}
                    name="title"
                    value={form.title}
                    onChange={handleFormChange}
                />
                <input type="submit" value={t("submit")} />
            </form>
        </div>
    );
};

export default DiaryMood;
