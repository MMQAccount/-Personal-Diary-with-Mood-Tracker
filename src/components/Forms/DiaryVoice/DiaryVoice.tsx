import React, { useContext, useEffect, useState } from "react";
import '../DiaryForm/DiaryForm.css';
import { DiaryContext } from "../../../providers/diary-provider";
import { useNavigate } from "react-router-dom";
import { useReactMediaRecorder } from "react-media-recorder";
import { useTranslation } from "react-i18next";

const DiaryVoice = () => {
    const { t } = useTranslation("diary");
    const { status, startRecording, stopRecording, mediaBlobUrl } = useReactMediaRecorder({ audio: true });
    const { addToDiary, updateDiary, diary } = useContext(DiaryContext);
    const navigate = useNavigate();

    const [form, setForm] = useState<Store.IVoiceForm>({ voice: "" });

    useEffect(() => {
        if (mediaBlobUrl) {
            setForm(prev => ({ ...prev, voice: mediaBlobUrl }));
        }
    }, [mediaBlobUrl]);

    const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
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
            updateDiary(existingDiary.id, {
                ...existingDiary,
                voices: [...(existingDiary.voices || []), form.voice],
            });
        } else {
            const newDiary: Store.IDayDiary = {
                id: todayTimestamp,
                notes: [],
                images: [],
                voices: [form.voice],
                title: "",
                type: [],
                state: -1,
            };
            addToDiary(newDiary);
        }
        setForm({ voice: "" });
        navigate("/diaryPage");
    };

    return (
        <div className="form-wrapper">
            <form onSubmit={handelSubmit}>
                <div className='diary_data'>
                    <div className="record_buttons">
                        {status === "recording" ? (
                            <button type="button" onClick={() => stopRecording()}>
                                {t("stop_recording")}
                            </button>
                        ) : (
                            <button type="button" onClick={() => startRecording()}>
                                {t("start_recording")}
                            </button>
                        )}
                        <span>
                            {status === "recording" ? t("status_recording") : t("status_not_recording")}
                        </span>
                    </div>

                    {mediaBlobUrl && (
                        <div>
                            <h4>{t("playback")}</h4>
                            <audio src={mediaBlobUrl} controls />
                        </div>
                    )}
                    <input type="submit" value={t("submit")} />
                </div>
            </form>
        </div>
    );
};

export default DiaryVoice;
