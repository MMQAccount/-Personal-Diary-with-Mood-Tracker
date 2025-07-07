import React, { useContext, useState } from "react";
import { DiaryContext } from "../../../providers/diary-provider";
import "../DiaryForm/DiaryForm.css";
import { useNavigate } from "react-router";

const DiaryMood = () => {


    const { addToDiary } = useContext(DiaryContext);
    const navigate = useNavigate();

    const emojis = ['😭', '🙁', '😐', '☺️', '😁']; const state = [
        "RELLY TERRIBLE",
        "SOMEWHAT BAD",
        "COMPLETELY OKAY",
        "PRETTY GOOD",
        "SUPER AWESOME",
    ];
    const [moodValue, setMoodValue] = useState(2);
    const INITIAL_FORM: Store.IForm = {
        title: "",
        notes: "",
        type: [],
        image: "",
        state: -1,
    };
    const [form, setForm] = useState<Store.IForm>(INITIAL_FORM);
    const handleFormChange = (
        e: React.ChangeEvent<
            HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
        >
    ) => {
        e.preventDefault();
        let value: any = e.target.value;
        if (e.target.name === "state") {
            value = Number(value);
        }
        setForm({ ...form, [e.target.name]: value });
    };
    const handelSubmit = (e: React.MouseEvent<HTMLFormElement>) => {
        e.preventDefault();
        const newDiary: Store.IDiaryItem = { id: Date.now(), ...form };
        addToDiary(newDiary);
        console.log(newDiary);
        navigate("/diaryPage");
    };

    return (
        <form onSubmit={handelSubmit}>
            <h1>{state[moodValue]}</h1>
            <div className="mood_input">
                <input
                    type="range"
                    min={0}
                    max={4}
                    defaultValue={2}
                    className="range_input"
                    name="state"
                    onChange={(e) => {
                        setMoodValue(parseInt(e.target.value));
                        handleFormChange(e);
                    }}
                    required />
                <h1>{emojis[moodValue]}</h1>
            </div>
                <input type="submit" name="Submit" />
        </form>
    );
};

export default DiaryMood;
