import React, { useContext, useEffect, useState } from 'react';
import '../DiaryForm/DiaryForm.css';
import { DiaryContext } from '../../../providers/diary-provider';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const DiaryImage = () => {
    const { t } = useTranslation("diary");
    const INITIAL_FORM: Store.IImageForm = { image: '' };
    const [form, setForm] = useState<Store.IImageForm>(INITIAL_FORM);
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
    const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handelSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const todayTimestamp = today.getTime();

        const existingDiary = diary.find(d => {
            const entryDate = new Date(d.id);
            entryDate.setHours(0, 0, 0, 0);
            return entryDate.getTime() === todayTimestamp;
        });

        if (existingDiary) {
            updateDiary(existingDiary._id, {
                ...existingDiary,
                images: [...(existingDiary.images || []), form.image],
            });
        } else {
            const newDiary: Store.IDayDiaryInput = {
                id: todayTimestamp,
                images: [form.image],
                notes: [],
                voices: [],
                title: "",
                type: [],
                state: 0,
            };
            addToDiary(newDiary);
        }

        setForm(INITIAL_FORM);
        navigate("/diaryPage");
    };

    return (
        <div className="form-wrapper">
            <form onSubmit={handelSubmit}>
                <div className='diary_data'>
                    <input
                        type="text"
                        name='image'
                        placeholder={t("imageUrlPlaceholder")}
                        value={form.image}
                        onChange={handleFormChange}
                        required
                    />
                    <input type="submit" value={t("submit")} />
                </div>
            </form>
        </div>
    );
};

export default DiaryImage;
