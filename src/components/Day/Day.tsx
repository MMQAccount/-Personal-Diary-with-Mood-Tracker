import "../Diary/Diary.css";
import { DiaryContext } from "../../providers/diary-provider";
import { useContext } from "react";
import Diary from "../Diary/Diary";
import ImageDiary from "../Diary/ImageDiary";
import VoiceDiary from "../Diary/VoiceDiary";

interface IProps {
    id: number;
}

const Day = ({ id }: IProps) => {
    const { diary } = useContext(DiaryContext);
    const date = new Date(id);
    const filterToday = (id: number, diary: Store.IDayDiary[]): Store.IDayDiary[] => {
        if (!diary.length) return [];
        return diary.filter(d => {
            return id === d.id;
        });
    };

    const todayEntries = filterToday(id, diary);
    const emojis = ['😭', '🙁', '😐', '☺️', '😁'];

    return (
        <div className="container">
            <div className="header_date" >
                <div className="header_date_day">
                    <div className="date_div">
                        <h3>{date.toLocaleDateString('en-US', { day: 'numeric' })}</h3>
                        <h3>{date.toLocaleDateString('en-US', { month: 'long' })}</h3>
                    </div>
                    <h2>{date.toLocaleDateString('en-US', { weekday: 'long' })}</h2>
                </div>
                <div className="diary_notes">
                    <h2>{todayEntries.map(d => (d.title))}</h2>
                </div>
                <div className="header_mood_type">
                    <h4>
                        {todayEntries
                            .map(d => (d.type ? d.type : ""))
                            .join(" ")}
                    </h4>
                    <h2>{todayEntries.map(d => (d.state ? emojis[d.state] : ""))}</h2>
                </div>
            </div>
                

            {
                todayEntries.flatMap(d =>
                    d.notes?.map((n, i) => (
                        <Diary key={`${d.id}-${i}`} note={n} />
                    )) || []
                )
            }
            {
                todayEntries.flatMap(d =>
                    d.voices?.map((n, i) => (
                        <VoiceDiary key={`${d.id}-${i}`} voice={n} />
                    )) || []
                )
            }
            {
                todayEntries.map(d => (
                    d.images && d.images.length > 0 ? (
                        <div key={d.id} className="image_note">
                            <ImageDiary images={d.images} />
                        </div>
                    ) : null
                ))
            }

        </div >
    );
};

export default Day;
