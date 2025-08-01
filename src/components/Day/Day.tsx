import "../Diary/Diary.css";
import { DiaryContext } from "../../providers/diary-provider";
import { TagsContext } from "../../providers/tag-providor";
import { useContext } from "react";
import Diary from "../Diary/Diary";
import ImageDiary from "../Diary/ImageDiary";
import VoiceDiary from "../Diary/VoiceDiary";
import { EditOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router";

interface IProps {
  id: number;
}

const Day = ({ id }: IProps) => {
  const navigate = useNavigate();
  const { diary } = useContext(DiaryContext);
  const { tags } = useContext(TagsContext);

  const date = new Date(id);

  const filterToday = (id: number, diary: Store.IDayDiary[]): Store.IDayDiary[] => {
    if (!diary.length) return [];
    return diary.filter(d => id === d.id);
  };

  const getTagNamesFromIds = (tagIds?: string[]): string[] => {
    if (!tagIds) return [];
    return tagIds.map(id => {
      const tag = tags.find(t => t._id === id);
      return tag ? tag.name : id;
    });
  };

  const todayEntries = filterToday(id, diary);
  const emojis = ['😭', '🙁', '😐', '☺️', '😁'];

  const goToEdit = (id: number) => {
    navigate(`/EditDay/${id}`);
  };

  return (
    <div className="container">
      <div className="header_date">
        <div className="header_date_day">
          <div className="date_div">
            <h3>{date.toLocaleDateString('en-US', { day: 'numeric' })}</h3>
            <h3>{date.toLocaleDateString('en-US', { month: 'long' })}</h3>
          </div>
          <h2>{date.toLocaleDateString('en-US', { weekday: 'long' })}</h2>
        </div>
      </div>

      <div className="diary_notes">
        <h2 className="title">
          {todayEntries.map(d => d.title).join(", ")}{" "}
          {todayEntries.map(d => emojis[d.state ?? -1] ?? " ").join(" ")}
        </h2>
        <div className="header_mood_type">
          {todayEntries
            .flatMap(d => getTagNamesFromIds(d.type))
            .join(" | ")}
          <EditOutlined className="edit_icon" onClick={() => goToEdit(id)} />
        </div>
      </div>

      {todayEntries.flatMap(d =>
        d.notes?.map((n, i) => (
          <Diary key={`${d.id}-${i}`} id={i} note={n} day={d.id} />
        )) || []
      )}

      {todayEntries.flatMap(d =>
        d.voices?.map((n, i) => (
          <VoiceDiary key={`${d.id}-${i}`} voice={n} id={i} day={d.id} />
        )) || []
      )}

      {todayEntries.map(d =>
        d.images && d.images.length > 0 ? (
          <div key={d.id} className="diary_content images">
            <ImageDiary images={d.images} id={d.id} />
          </div>
        ) : null
      )}
    </div>
  );
};

export default Day;
