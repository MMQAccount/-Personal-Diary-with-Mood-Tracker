import './DiaryPage.css';
import { PlusOutlined, SearchOutlined } from '@ant-design/icons';
import { Input } from 'antd';
import { useNavigate } from 'react-router-dom';
import { DiaryContext } from '../../providers/diary-provider';
import { useContext, useState } from 'react';
import Day from '../../components/Day/Day';
import Diary from '../../components/Diary/Diary';

const DiaryPage = () => {
  const navigate = useNavigate();
  const { diary } = useContext(DiaryContext);

  const [searchResults, setSearchResults] = useState<Store.IDiaryItem[]>([]);

  const handleChangeInput = (value:string) => {
    if (value === 'input') navigate('/diaryForm');
    else if (value === 'voice') navigate('/diaryVoice');
    else if (value === 'image') navigate('/diaryImage');
  };

  const getUniqueDiaryDayIds = (diary: Store.IDiaryItem[]): number[] => {
    const uniqueDaysMap = new Map<string, number>();
    diary.forEach(item => {
      const dayKey = new Date(item.id).toISOString().split("T")[0];
      if (!uniqueDaysMap.has(dayKey)) {
        uniqueDaysMap.set(dayKey, item.id);
      }
    });
    return Array.from(uniqueDaysMap.values());
  };

  const DiaryDays = getUniqueDiaryDayIds(diary);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.toLowerCase();
    if (!val.trim()) {
      setSearchResults([]); 
      return;
    }

    const filtered = diary.filter(d =>
      d.title.toLowerCase().includes(val) || d.notes.toLowerCase().includes(val)
    );
    setSearchResults(filtered);
  };
  const [open, setOpen] = useState(false);

  const options = [
    { label: 'input 📜', value: 'input' },
    { label: 'voice 🎙️', value: 'voice' },
    { label: 'image🖼️', value: 'image' },
  ];

  const handleSelect = (value: string) => {
    handleChangeInput(value);
    setOpen(false);
  };
  return (
    <div className="diary_container">
      <div className='search_container'>
        <h1>Welcome,</h1>
        <div className="input_wrapper">
          <Input
            placeholder="Search ..."
            prefix={<SearchOutlined className='icon' />}
            className='search_input'
            onChange={handleSearch}
          />
        </div>
        <div className="diary_type">
      <div className="select-header" onClick={() => setOpen(!open)}>
         <PlusOutlined/>
      </div>

      {open && (
        <ul className="select-options">
          {options.map(opt => (
            <li key={opt.value} onClick={() => handleSelect(opt.value) }>
              {opt.label}
            </li>
          ))}
        </ul>
      )}
    </div>
      </div>

      <div className='diarys'>
        {searchResults.length > 0
          ? searchResults.map(d => (
              <Diary
                key={d.id}
                id={d.id}
                title={d.title}
                notes={d.notes}
                state={d.state}
                type={d.type}
                image={d.image}
                audio={d.audio}
              />
            ))
          : diary.length > 0
          ? DiaryDays.map(d => <Day key={d} id={d} />)
          : <h3>Can't Find Any Diary, Try To Add Some</h3>}
      </div>
    </div>
  );
};

export default DiaryPage;
