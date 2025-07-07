import React, { useContext, useEffect, useState } from "react";
import '../DiaryForm/DiaryForm.css';
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
import { DiaryContext } from "../../../providers/diary-provider";
import { useNavigate } from "react-router-dom";
import { useReactMediaRecorder } from "react-media-recorder";

const DiaryVoice = () => {
    const { transcript, listening, browserSupportsSpeechRecognition } = useSpeechRecognition();
    const { status, startRecording, stopRecording, mediaBlobUrl } = useReactMediaRecorder({ audio: true });
    const { addToDiary } = useContext(DiaryContext);
    const navigate = useNavigate();
    const INITIAL_FORM: Store.IForm = {
        title: '',
        notes: '',
        type: [],
        image: '',
        state: -1,
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

    return (
        <form onSubmit={handelSubmit}>
            <div className='diary_data'>

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
