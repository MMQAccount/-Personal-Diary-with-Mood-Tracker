import './DiaryPage.css';
import { SearchOutlined } from '@ant-design/icons';
import { Input } from 'antd';
import Diary from '../../components/Diary/Diary';
import { useNavigate } from 'react-router-dom';


const DiaryPage = () => {
  const navigate = useNavigate();
    const diary: Store.IDiaryItem[] = [
        {
            id:65,
            title: "A Peaceful Evening 🌅",
            notes: `## Today was a calm and peaceful day. I spent the afternoon walking through the park, enjoying the soft breeze and the sound of birds.I feel **grateful** for these small moments.> "Happiness is not something ready-made. It comes from your own actions." — Dalai Lama ![Sunset](https://example.com/sunset.jpg)`,
            state: 3
        }
    ];
  function handelChangeInput(e: React.ChangeEvent<HTMLSelectElement>) {
    const value = e.target.value;
    if (value === 'input') navigate('/diaryForm');
    else if (value === 'voice') navigate('/diaryVoice');
    else if (value === 'image') navigate('/diaryImage');
  }

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
       {
        Boolean(diary.length)
          ? diary.map(d => (
            <Diary
            key={d.id}
            title={d.title}
            notes={d.notes}
            state={d.state}
            image={d.image}
            />
          ))
          : <h3>Can't Find Any Diary</h3>
      }
    </div>
  );
}

export default DiaryPage;
