import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { DiaryContext } from "../../providers/diary-provider";

type IParams = { id: string };

const DiaryEditPage = () => {
    const { diary, updateDiary } = useContext(DiaryContext);
    const params = useParams() as IParams;
    const navigate = useNavigate();

    const emojis = ['😭', '🙁', '😐', '☺️', '😁'];
    const stateLabels = ["REALLY TERRIBLE", "SOMEWHAT BAD", "COMPLETELY OKAY", "PRETTY GOOD", "SUPER AWESOME"];

    const INITIAL_FORM: Store.IDiaryMood = { title: '', type: [], state: 2 };
    const [form, setForm] = useState<Store.IMoodForm>(INITIAL_FORM);
    const [moodValue, setMoodValue] = useState<number>(2);
    const [diaryEx, setDiaryEx] = useState<Store.IDayDiary>();

    useEffect(() => {
        const d = diary?.find(d => d.id === Number(params.id));
        if (d) {
            setDiaryEx(d);
            setForm({
                title: d.title ?? "",
                type: d.type ?? [],
                state: d.state ?? 2,
            });
            setMoodValue(d.state ?? 2);
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
        if (!diaryEx) return;

        updateDiary(diaryEx.id, {
            ...diaryEx,
            title: form.title.trim(),
            type: [...form.type],
            state: form.state,
        });

        navigate("/diaryPage");
    };

    if (!diaryEx) return <h2>Loading diary entry...</h2>;
    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value, checked } = e.target;
        setForm(prevForm => {
            const updatedTypes = checked
                ? [...prevForm.type, value]
                : prevForm.type.filter((t) => t !== value);
            return { ...prevForm, type: updatedTypes };
        });
    };
    const tags = ["Family 👨‍👩‍👧‍👦", "Work 🏢", "School 🏫", "Friends 👥"];

    return (
        <div className="editForm">
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
                    <div className="check">
                        {tags.map(m => (
                            <label className="checkbox-label">
                                <input type="checkbox" value={m} onChange={handleCheckboxChange} />
                                <span className={form.type.includes(m) ? "checked_span" : ""}>
                                    {m}
                                </span>
                            </label>))
                        }
                    </div>
                    <br />
                    <input type="text" placeholder='Title...' name='title' value={form.title} onChange={handleFormChange} />
                    <input type="submit" value="Submit" />
                </div>
            </form>
        </div>
    );
};

export default DiaryEditPage;
