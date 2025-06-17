import React, { useEffect, useState } from "react";
import '../DiaryForm/DiaryForm.css';
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

const DiaryVoice = () => {
    const {
        transcript,
        listening,
        resetTranscript,
        browserSupportsSpeechRecognition,
    } = useSpeechRecognition();
    useEffect(() => {
        setForm(prev => ({ ...prev, notes: transcript }));
    }, [transcript]);

    if (!browserSupportsSpeechRecognition) {
        return <span>Your browser does not support speech recognition.</span>;
    }
    const emojis =  ['😔', '😐', '🙂', '☺️', '😄'];
    const state =  ["RELLY TERRIBLE", "SOMEWHAT BAD", "COMPLETELY OKAY", "PRETTY GOOD", "SUPER AWESOME"];
    const [moodValue, setMoodValue] = useState(2); 
    const INITIAL_FORM: Store.IForm = { title: '', notes: '', type:'', image: '', state: moodValue };
    const [form, setForm] = useState<Store.IForm>(INITIAL_FORM);

    const handleFormChange = (e:React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        e.preventDefault();
        let value: any = e.target.value;
        if (e.target.name === 'state') {
            value = Number(value);
        }
        setForm({ ...form, [e.target.name]: value });
    }
    const handelSubmit = (e:React.MouseEvent<HTMLFormElement>) => {
        e.preventDefault();
        const newDiary: Store.IDiaryItem = { id: Date.now(), ...form };
        console.log(newDiary);
    }

    return(
        <form onSubmit={handelSubmit}>
            <h1>{state[moodValue]}</h1>
            <div className='mood_input'>
                <input type="range" min={0} max={4} defaultValue={2} className='range_input' name='state'
                 onChange={(e) => {
                    setMoodValue(parseInt(e.target.value));
                    handleFormChange(e);
                }}
                />
                <h1>{emojis[moodValue]}</h1>
            </div>
            <div className='diary_data'>
                <select name="type" id="type" className='type' defaultValue={""} onChange={handleFormChange}>
                    <option value="" hidden>Select Community</option>
                    <option value="family">Family 👨‍👩‍👧‍👦</option>
                    <option value="work">Work 🏢</option>
                    <option value="school">School 🏫</option>
                    <option value="friends">Friends 👥</option>
                </select>
                <input type="text" placeholder='Title...' name='title' onChange={handleFormChange}/>
                <textarea name="notes" id="data" placeholder="Your speech will appear here..." value={transcript}></textarea>
                <div className="record_buttons">
                    <button
                        type="button"
                        onClick={() => SpeechRecognition.startListening({ continuous: true })}
                    >
                        Record
                    </button>
                    <button onClick={SpeechRecognition.stopListening}>Done</button> 
                    <button onClick={resetTranscript}>
                        Clear
                    </button><span>Listening: {listening ? "🟢" : "🔴"}</span>
                </div>
                <input type="submit" name='Submit'/>
            </div>
            
        </form>
    );
}

export default DiaryVoice;