import React, { useContext, useState } from "react";
import { DiaryContext } from "../../../providers/diary-provider";
import "./DiaryForm.css";
import { useNavigate } from "react-router";

const DiaryForm = () => {
    const { addToDiary, updateDiary, diary } = useContext(DiaryContext);
    const navigate = useNavigate();

    const INITIAL_FORM: Store.INoteForm = {
        notes: "",
    };
    const [form, setForm] = useState<Store.INoteForm>(INITIAL_FORM);

    const handleFormChange = (
        e: React.ChangeEvent<HTMLTextAreaElement>
    ) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handelSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const todayTimestamp = today.getTime();

        const existingDiary = diary.find((d) => {
            const entryDate = new Date(d.id);
            entryDate.setHours(0, 0, 0, 0);
            return entryDate.getTime() === todayTimestamp;
        });

        if (existingDiary) {
            updateDiary(existingDiary.id, {
                ...existingDiary,
                notes: [...(existingDiary.notes || []), form.notes],
            });
        } else {
            const newDiary: Store.IDayDiary = {
                id: todayTimestamp,
                notes: [form.notes],
            };
            addToDiary(newDiary);
        }

        setForm(INITIAL_FORM);
        navigate("/diaryPage");
    };

    return (
        <form onSubmit={handelSubmit}>
            <div className="diary_data">
                <textarea
                    name="notes"
                    id="data"
                    placeholder="Add some notes..."
                    value={form.notes}
                    onChange={handleFormChange}
                    required
                ></textarea>
                <input type="submit" name="Submit" />
            </div>
        </form>
    );
};

export default DiaryForm;
