import './DiaryPage.css';
import { SearchOutlined } from '@ant-design/icons';
import { Input } from 'antd';
import Diary from '../../components/Diary/Diary';
import { useNavigate } from 'react-router-dom';
import { DiaryContext } from '../../providers/diary-provider';
import { useContext } from 'react';


const DiaryPage = () => {
  const navigate = useNavigate();
  function handelChangeInput(e: React.ChangeEvent<HTMLSelectElement>) {
    const value = e.target.value;
    if (value === 'input') navigate('/diaryForm');
    else if (value === 'voice') navigate('/diaryVoice');
    else if (value === 'image') navigate('/diaryImage');
  }
  const { diary } = useContext(DiaryContext);

  return (
    <div className="diary_container">
      <div className='search_container'>
        <h1>Welcome,</h1>
        <div className="input_wrapper">
          <Input
            placeholder="Search ..."
            prefix={<SearchOutlined className='icon' />}
            className='search_input'
          />
        </div>
        <select
          name="diary_type"
          id="diary_type"
          className='diary_type'
          defaultValue=""
          onChange={handelChangeInput}
        >
          <option value="" disabled hidden>➕</option>
          <option value="input">input 📜</option>
          <option value="voice">voice 🎙️</option>
          <option value="image">image 🖼️</option>
        </select>
      </div>
      <div className='diarys'>
        {
          Boolean(diary.length)
            ? diary.map(d => (
              <Diary
                key={d.id}
                id={d.id}
                title={d.title}
                notes={d.notes}
                state={d.state}
                image={d.image}
                type={d.type}
              />
            ))
            : <h3>Can't Find Any Diary</h3>
        }
      </div>
    </div>
  );
}

export default DiaryPage;
