import React, { useContext, useEffect, useState } from "react";
import '../DiaryForm/DiaryForm.css';
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
import { DiaryContext } from "../../../providers/diary-provider";
import { useNavigate } from "react-router-dom";
import { useReactMediaRecorder } from "react-media-recorder";

const DiaryVoice = () => {
    const { transcript, listening, browserSupportsSpeechRecognition } = useSpeechRecognition();
    const { status, startRecording, stopRecording, mediaBlobUrl } = useReactMediaRecorder({ audio: true });
    const emojis = ['😭', '🙁', '😐', '☺️', '😁']; const stateLabels = ["RELLY TERRIBLE", "SOMEWHAT BAD", "COMPLETELY OKAY", "PRETTY GOOD", "SUPER AWESOME"];
    const { addToDiary } = useContext(DiaryContext);
    const navigate = useNavigate();
    const [moodValue, setMoodValue] = useState(2);
    const INITIAL_FORM: Store.IForm = {
        title: '',
        notes: '',
        type: [],
        image: '',
        state: moodValue,
    };
    const [form, setForm] = useState<Store.IForm>(INITIAL_FORM);

    useEffect(() => {
        if (listening) {
            setForm(prev => ({ ...prev, notes: transcript }));
        }
    }, [transcript, listening]);

    if (!browserSupportsSpeechRecognition) {
        return <span>Your browser does not support speech recognition.</span>;
    }

    const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        let value: any = e.target.value;
        if (e.target.name === 'state') {
            value = Number(value);
        }
        setForm({ ...form, [e.target.name]: value });
    };

    const handelSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const newDiary: Store.IDiaryItem = {
            id: Date.now(),
            ...form,
            audio: mediaBlobUrl || ''
        };

        addToDiary(newDiary);
        console.log(newDiary);
        navigate('/diaryPage');
    };

    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value, checked } = e.target;
        setForm(prevForm => {
            const updatedTypes = checked
                ? [...prevForm.type, value]
                : prevForm.type.filter((t) => t !== value);
            return { ...prevForm, type: updatedTypes };
        });
    };

    return (
        <form onSubmit={handelSubmit}>
            <h1>{stateLabels[moodValue]}</h1>
            <div className='mood_input'>
                <input
                    type="range"
                    min={0}
                    max={4}
                    defaultValue={2}
                    className='range_input'
                    name='state'
                    onChange={(e) => {
                        setMoodValue(parseInt(e.target.value));
                        handleFormChange(e);
                    }}
                    required
                />
                <h1>{emojis[moodValue]}</h1>
            </div>

            <div className='diary_data'>
                <div className="check">
                    <label className="checkbox-label">
                        <input
                            type="checkbox"
                            value="Family"
                            onChange={handleCheckboxChange}
                            hidden
                        />
                        <span className={form.type.includes("Family") ? "checked_span" : ""}>Family 👨‍👩‍👧‍👦</span>
                    </label>
                    <label className="checkbox-label">
                        <input type="checkbox" name="Work" value="Work" onChange={handleCheckboxChange} />
                        <span className={form.type.includes("Work") ? "checked_span" : ""}>Work 🏢</span>
                    </label>
                    <label className="checkbox-label">
                        <input type="checkbox" name="School" value="School" onChange={handleCheckboxChange} />
                        <span className={form.type.includes("School") ? "checked_span" : ""}>School 🏫</span>
                    </label>
                    <label className="checkbox-label">
                        <input type="checkbox" name="Friends" value="Friends" onChange={handleCheckboxChange} />
                        <span className={form.type.includes("Friends") ? "checked_span" : ""}>Friends 👥</span>
                    </label>
                </div>

                <input type="text" placeholder='Title...' name='title' onChange={handleFormChange} required />
                <textarea name="notes" placeholder="Type notes or use voice..." value={form.notes} onChange={handleFormChange} />

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
