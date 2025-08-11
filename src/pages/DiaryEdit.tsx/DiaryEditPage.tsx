import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { DiaryContext } from "../../providers/diary-provider";
import { TagsContext } from "../../providers/tag-providor";
import { useTranslation } from "react-i18next";
import { useUserData } from "../../providers/user-provider";
import { customMoodEmojisMap } from "../../constants/mood-no";
import { nameToIcon } from "../../components/MoodLineChart/MoodLineChart";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type IParams = { id: string };

const DiaryEditPage = () => {
    const { t } = useTranslation("diary");
    const { diary, updateDiary } = useContext(DiaryContext);
    const params = useParams() as IParams;
    const navigate = useNavigate();

    const { user } = useUserData();


    const stateLabels = [
        t("reallyTerrible"),
        t("somewhatBad"),
        t("completelyOkay"),
        t("prettyGood"),
        t("superAwesome")
    ];

    const INITIAL_FORM: Store.IDiaryMood = { title: '', type: [], state: 2 };
    const [form, setForm] = useState<Store.IMoodForm>(INITIAL_FORM);
    const [moodValue, setMoodValue] = useState<number>(2);
    const [diaryEx, setDiaryEx] = useState<Store.IDayDiary>();
    const emojis = user?.customMoodEmojis; const moodKey = customMoodEmojisMap[moodValue ?? -1] as keyof typeof emojis;
    const iconName = emojis?.[moodKey] ?? "";
    const iconDef = nameToIcon[iconName];
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

        updateDiary(diaryEx._id, {
            ...diaryEx,
            title: form.title.trim(),
            type: [...form.type],
            state: form.state,
        });

        navigate("/diaryPage");
    };

    if (!diaryEx) return <h2>{t("loadingDiary") || "Loading diary entry..."}</h2>;

    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value, checked } = e.target;
        setForm(prevForm => {
            const updatedTypes = checked
                ? [...prevForm.type, value]
                : prevForm.type.filter((t) => t !== value);
            return { ...prevForm, type: updatedTypes };
        });
    };

    const { tags } = useContext(TagsContext);

    return (
        <div className="editForm">
            <form onSubmit={handleSubmit}>
                <h1>{stateLabels[moodValue]}</h1>
                <h5 className="your_mood_msg">Select your mood today : )</h5>
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
                    <h1>{iconDef ? (
                        <FontAwesomeIcon icon={iconDef} />
                    ) : (
                        ""
                    )}</h1>
                </div>
                <div className='diary_data'>
                    <div className="tag_container">
                        <span className="tag_title">Tags : </span>
                        <div className="check">
                            {tags.map(m => (
                                <label key={m._id} className="checkbox-label">
                                    <input
                                        type="checkbox"
                                        value={m._id}
                                        onChange={handleCheckboxChange}
                                        checked={form.type.includes(m._id)}
                                    />
                                    <span className={form.type.includes(m._id) ? "checked_span" : "unchecked_span"}>
                                        {t(m.name)}
                                    </span>
                                </label>
                            ))}
                        </div>
                    </div>
                    <input
                        type="text"
                        placeholder={t("titlePlaceholder")}
                        name='title'
                        value={form.title}
                        onChange={handleFormChange}
                    />
                    <input type="submit" value={t("submit")} />
                </div>
            </form>
        </div>
    );
};

export default DiaryEditPage;
