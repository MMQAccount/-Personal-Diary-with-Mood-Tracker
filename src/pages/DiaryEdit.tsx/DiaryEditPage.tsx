import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { DiaryContext } from "../../providers/diary-provider";

type IParams = { id: string };

const DiaryEditPage = () => {
  const { diary, updateDiary } = useContext(DiaryContext);
  const params = useParams() as IParams;
  const navigate = useNavigate();

  const emojis = ['😔', '😐', '🙂', '☺️', '😄'];
  const stateLabels = ["REALLY TERRIBLE", "SOMEWHAT BAD", "COMPLETELY OKAY", "PRETTY GOOD", "SUPER AWESOME"];

  const INITIAL_FORM: Store.IForm = { title: '', notes: '', type: '', image: '', state: 2 };
  const [form, setForm] = useState<Store.IForm>(INITIAL_FORM);
  const [moodValue, setMoodValue] = useState<number>(2);
  const [diaryEx, setDiaryEx] = useState<Store.IDiaryItem>();

  useEffect(() => {
    const d = diary?.find(d => d.id === Number(params.id));
    if (d) {
      setDiaryEx(d);
      setForm({
        title: d.title,
        notes: d.notes,
        type: d.type,
        image: d.image ?? '',
        state: d.state,
      });
      setMoodValue(d.state);
    }
  }, [params.id, diary]);

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    let value: any = e.target.value;
    if (e.target.name === 'state') {
      value = Number(value);
    }
    setForm({ ...form, [e.target.name]: value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newDiary: Store.IDiaryItem = { id: Number(params.id), ...form };
    updateDiary(Number(params.id), newDiary);
    navigate('/diaryPage');
  };

  if (!diaryEx) return <h2>Loading diary entry...</h2>;

  return (
    <form onSubmit={handleSubmit}>
      <h1>{stateLabels[moodValue]}</h1>
      <div className='mood_input'>
        <input
          type="range"
          min={0}
          max={4}
          value={moodValue}
          className='range_input'
          name='state'
          onChange={(e) => {
            const val = parseInt(e.target.value);
            setMoodValue(val);
            handleFormChange(e);
          }}
        />
        <h1>{emojis[moodValue]}</h1>
      </div>
      <div className='diary_data'>
        <select name="type" className='type' defaultValue={form.type} value={form.type} onChange={handleFormChange}>
          <option value="Family">Family 👨‍👩‍👧‍👦</option>
          <option value="Work">Work 🏢</option>
          <option value="School">School 🏫</option>
          <option value="Friends">Friends 👥</option>
        </select>
        <input type="text" placeholder='Title...' name='title' value={form.title} onChange={handleFormChange} />
        <textarea name="notes" placeholder='Add some notes...' value={form.notes} onChange={handleFormChange}></textarea>
        {diaryEx?.image && (
          <input type="text" name='image' placeholder='Image URL...' value={form.image} onChange={handleFormChange} />
        )}
        <input type="submit" value="Submit" />
      </div>
    </form>
  );
};

export default DiaryEditPage;
