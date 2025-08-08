import "../Diary/Diary.css";
import { DiaryContext } from "../../providers/diary-provider";
import { TagsContext } from "../../providers/tag-providor";
import { useContext } from "react";
import Diary from "../Diary/Diary";
import ImageDiary from "../Diary/ImageDiary";
import VoiceDiary from "../Diary/VoiceDiary";
import { EditOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router";
import { useUserData } from "../../providers/user-provider";
import { customMoodEmojisMap } from "../../constants/mood-no";
import { nameToIcon } from "../MoodLineChart/MoodLineChart";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface IProps {
  id: number;
}

const Day = ({ id }: IProps) => {
  const navigate = useNavigate();
  const { diary } = useContext(DiaryContext);
  const { tags } = useContext(TagsContext);

  const date = new Date(id);

  const filterToday = (id: number, diary: Store.IDayDiary[] = []): Store.IDayDiary[] => {
    if (!Array.isArray(diary) || diary.length === 0) return [];
    return diary.filter(d => id === d.id);
  };

  const getTagNamesFromIds = (tagIds?: string[]): string[] => {
    if (!tagIds || !Array.isArray(tagIds)) return [];
    return tagIds.map(id => {
      const tag = tags?.find(t => t._id === id);
      return tag ? tag.name : id;
    });
  };

  const todayEntries = filterToday(id, diary);
  const { user } = useUserData();

  const emojis = user?.customMoodEmojis ?? {};

  const goToEdit = (id: number) => {
    navigate(`/EditDay/${id}`);
  };

  return (
    <div className="container">
      <div className="header_date_day">
        <div className="date_div">
          <h3>{date.toLocaleDateString('en-US', { day: 'numeric' })}</h3>
          <h3>{date.toLocaleDateString('en-US', { month: 'long' })}</h3>
        </div>
        <h2>{date.toLocaleDateString('en-US', { weekday: 'long' })}</h2>
      </div>

      <div className="diary_notes">
        <h2 className="title">
          {todayEntries.map(d => {
            const moodKey = customMoodEmojisMap[d.state ?? -1] as keyof typeof emojis;
            const iconName = emojis?.[moodKey] ?? "";
            const iconDef = iconName ? nameToIcon[iconName] : undefined;

            return iconDef ? (
              <FontAwesomeIcon key={`${d.id}-${d.state}`} icon={iconDef} />
            ) : (
              <span key={`${d.id}-${d.state}`}> </span>
            );
          })}{" "}
          {todayEntries.map(d => d.title || "").join(", ")}
        </h2>

        <div className="header_mood_type">
          {todayEntries.flatMap(d =>
            getTagNamesFromIds(d.type).map(t => (
              <span key={`${d.id}-${t}`} className="diary_tag">{t}</span>
            ))
          )}

          <EditOutlined className="edit_icon" onClick={() => goToEdit(id)} />
        </div>
      </div>

      {todayEntries.flatMap(d =>
        d.notes?.map((n, i) => (
          <Diary key={`${d.id}-note-${i}`} id={i} note={n} day={d.id} />
        )) || []
      )}

      {todayEntries.flatMap(d =>
        d.voices?.map((n, i) => (
          <VoiceDiary key={`${d.id}-voice-${i}`} voice={n} id={i} day={d.id} />
        )) || []
      )}

      {todayEntries.map(d =>
        d.images && d.images.length > 0 ? (
          <div key={`${d.id}-images`} className="diary_content images">
            <ImageDiary images={d.images} id={d.id} />
          </div>
        ) : null
      )}
    </div>
  );
};

export default Day;
