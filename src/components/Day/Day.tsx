import "../Diary/Diary.css";
import { DiaryContext } from "../../providers/diary-provider";
import { useContext } from "react";
import Diary from "../Diary/Diary";

interface IProps {
    id: number;
}

const Day = ({ id }: IProps) => {
    const { diary } = useContext(DiaryContext);
    const date = new Date(id);

    const filterToday = (date: number, diary: Store.IDiaryItem[]): Store.IDiaryItem[] => {
        if (!diary.length) return [];

        const targetDay = new Date(date).setHours(0, 0, 0, 0);

        return diary.filter(d => {
            const diaryDay = new Date(d.id).setHours(0, 0, 0, 0);
            return diaryDay === targetDay;
        });
    };

    const todayEntries = filterToday(Number(date), diary);

    return (
        <div className="container">
            <div className="header_date">
                <div className="date_div">
                    <h3>{date.toLocaleDateString('en-US', { day: 'numeric' })}</h3>
                    <h3>{date.toLocaleDateString('en-US', { month: 'long' })}</h3>
                </div>
                <h2>{date.toLocaleDateString('en-US', { weekday: 'long' })}</h2>
            </div>
            {todayEntries.map(d => (
                <Diary key={d.id} id={d.id} title={d.title} notes={d.notes} state={d.state} type={d.type} image={d.image} audio={d.audio} />
            ))}
        </div>
    );
};

export default Day;
