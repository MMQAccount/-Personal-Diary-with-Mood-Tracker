import React, { useContext, useEffect, useState } from "react";
import '../DiaryForm/DiaryForm.css';
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
import { DiaryContext } from "../../../providers/diary-provider";
import { useNavigate } from "react-router-dom";
import { useReactMediaRecorder } from "react-media-recorder";

const DiaryVoice = () => {
    const { transcript, listening, browserSupportsSpeechRecognition } = useSpeechRecognition();
    const { status, startRecording, stopRecording, mediaBlobUrl } = useReactMediaRecorder({ audio: true });
    const { addToDiary, updateDiary, diary } = useContext(DiaryContext);
    const navigate = useNavigate();

    const [form, setForm] = useState<Store.IVoiceForm>({ voice: "" });

    // بعد انتهاء التسجيل الصوتي، خزّن رابط التسجيل
    useEffect(() => {
        if (mediaBlobUrl) {
            setForm(prev => ({ ...prev, voice: mediaBlobUrl }));
        }
    }, [mediaBlobUrl]);

    // تحديث الملاحظات بناءً على الكلام المسجل
    useEffect(() => {
        if (listening) {
            setForm(prev => ({ ...prev, notes: transcript }));
        }
    }, [transcript, listening]);

    if (!browserSupportsSpeechRecognition) {
        return <span>Your browser does not support speech recognition.</span>;
    }

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
                state: 0,
            };
            addToDiary(newDiary);
        }

        setForm({ voice: "" });
        navigate("/diaryPage");
    };

    return (
        <form onSubmit={handelSubmit}>
            <div className='diary_data'>
                <textarea
                    name="notes"
                    placeholder="Speech notes (auto)"
                    value={form.voice || ""}
                    onChange={handleFormChange}
                />

                <div className="record_buttons">
                    {status === "recording" ? (
                        <button type="button" onClick={() => {
                            stopRecording();
                            SpeechRecognition.stopListening();
                        }}>Stop Recording</button>
                    ) : (
                        <button type="button" onClick={() => {
                            startRecording();
                            SpeechRecognition.startListening({ continuous: true });
                        }}>Start Recording</button>
                    )}
                    <span>Status: {status === "recording" ? "🟢 Recording" : "🔴 Not Recording"}</span>
                </div>

                {mediaBlobUrl && (
                    <div>
                        <h4>Playback:</h4>
                        <audio src={mediaBlobUrl} controls />
                    </div>
                )}
                <input type="submit" value="Submit" />
            </div>
        </form>
    );
};

export default DiaryVoice;
