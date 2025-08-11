import { DeleteOutlined } from "@ant-design/icons";
import "./Diary.css";
import { useContext } from "react";
import { DiaryContext } from "../../providers/diary-provider";
import { useNavigate } from "react-router-dom";

interface IProps {
  voice: string;
  id: number;
  day: number;
}

const VoiceDiary = ({ voice, id, day }: IProps) => {
  const { diary, updateDiary } = useContext(DiaryContext);
  const navigate = useNavigate();
  const del_diary = (id: number, day: number) => {
    const diaryDay = new Date(day);
    diaryDay.setHours(0, 0, 0, 0);
    const dayTimestamp = diaryDay.getTime();

    const existingDiary = diary.find((d) => {
      const entryDate = new Date(d.id);
      entryDate.setHours(0, 0, 0, 0);
      return entryDate.getTime() === dayTimestamp;
    });

    if (existingDiary) {
      const updatedNotes = existingDiary.voices
        ? existingDiary.voices.filter((_, index) => index !== id)
        : [];

      updateDiary(existingDiary._id, {
        ...existingDiary,
        voices: updatedNotes,
      });
    }
    navigate("/diaryPage");
  }
  return (
    <div className="diary_voice_content">
      <div className="diary_notes">
        {voice ? <audio src={voice} controls /> : ""}
        <DeleteOutlined className="del_icon" onClick={() => del_diary(id, day)} />
      </div>
    </div>
  );
};

export default VoiceDiary;
