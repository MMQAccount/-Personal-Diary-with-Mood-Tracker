import { useState } from 'react';
import './DiaryImage.css';

const DiaryImage = () => {
    const emojis =  ['😔', '😐', '🙂', '☺️', '😄'];
    const state =  ["RELLY TERRIBLE", "SOMEWHAT BAD", "COMPLETELY OKAY", "PRETTY GOOD", "SUPER AWESOME"];
    const [moodValue, setMoodValue] = useState(2);
    return(
        <form>
            <h1>{state[moodValue]}</h1>
            <div className='mood_input'>
                <input type="range" min={0} max={4} defaultValue={2} className='range_input'
                 onChange={
                    (e)=>{setMoodValue(parseInt(e.target.value));
                    }
                 }/>
                <h1>{emojis[moodValue]}</h1>
            </div>
            <div className='diary_data'>
                <select name="type" id="type" className='type'>
                    <option value="" selected hidden>Select Community</option>
                    <option value="family">Family 👨‍👩‍👧‍👦</option>
                    <option value="work">Work 🏢</option>
                    <option value="school">School 🏫</option>
                    <option value="friends">Friends 👥</option>
                </select>
                <input type="text" placeholder='Title...' name='title' />
                <textarea name="data" id="data" placeholder='Add some notes...'></textarea>
                <input type="file" name='title' />
                <input type="submit" name='Submit'/>
            </div>
        </form>
    );
}

export default DiaryImage;