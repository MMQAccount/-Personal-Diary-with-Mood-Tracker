import React, { useContext, useState } from "react";
import { DiaryContext } from "../../../providers/diary-provider";
import "../DiaryForm/DiaryForm.css";
import { useNavigate } from "react-router";

const DiaryMood = () => {
    const { addToDiary, updateDiary, diary } = useContext(DiaryContext);
    const navigate = useNavigate();

    const emojis = ['😭', '🙁', '😐', '☺️', '😁'];
    const stateTexts = [
        "REALLY TERRIBLE",
        "SOMEWHAT BAD",
        "COMPLETELY OKAY",
        "PRETTY GOOD",
        "SUPER AWESOME",
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

            updateDiary(existingDiary.id, updatedDiary);
        } else {
            const newDiary: Store.IDayDiary = {
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
                    <label className="checkbox-label">
                        <input type="checkbox" value="Family" onChange={handleCheckboxChange} />
                        <span className={form.type.includes("Family") ? "checked_span" : ""}>
                            Family 👨‍👩‍👧‍👦
                        </span>
                    </label>
                    <label className="checkbox-label">
                        <input type="checkbox" value="Work" onChange={handleCheckboxChange} />
                        <span className={form.type.includes("Work") ? "checked_span" : ""}>
                            Work 🏢
                        </span>
                    </label>
                    <label className="checkbox-label">
                        <input type="checkbox" value="School" onChange={handleCheckboxChange} />
                        <span className={form.type.includes("School") ? "checked_span" : ""}>
                            School 🏫
                        </span>
                    </label>
                    <label className="checkbox-label">
                        <input type="checkbox" value="Friends" onChange={handleCheckboxChange} />
                        <span className={form.type.includes("Friends") ? "checked_span" : ""}>
                            Friends 👥
                        </span>
                    </label>
                </div>
                <input type="text" placeholder='Title...' name='title' value={form.title} onChange={handleFormChange} />
                <input type="submit" value="Submit" />
            </form>
        </div>
    );
};

export default DiaryMood;
