import React, { useContext, useState } from 'react';
import '../DiaryForm/DiaryForm.css';
import { DiaryContext } from '../../../providers/diary-provider';
import { useNavigate } from 'react-router-dom';

const DiaryImage = () => {
    const INITIAL_FORM: Store.IForm = { title: '', notes: '', type: [], image: '', state: -1 };
    const [form, setForm] = useState<Store.IForm>(INITIAL_FORM);
    const { addToDiary } = useContext(DiaryContext);
    const navigate = useNavigate();

    const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        e.preventDefault();
        let value: any = e.target.value;
        if (e.target.name === 'state') {
            value = Number(value);
        }
        setForm({ ...form, [e.target.name]: value });
    }
    const handelSubmit = (e: React.MouseEvent<HTMLFormElement>) => {
        e.preventDefault();
        const newDiary: Store.IDiaryItem = { id: Date.now(), ...form };
        addToDiary(newDiary);
        console.log(newDiary);
        navigate('/diaryPage')
    }

    return (
        <form onSubmit={handelSubmit}>
            <div className='diary_data'>
                <input type="text" name='image' placeholder='Image url...' onChange={handleFormChange} required />
                <input type="submit" name='Submit' required />
            </div>
        </form>
    );
}

export default DiaryImage;