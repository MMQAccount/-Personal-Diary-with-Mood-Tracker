import { DeleteOutlined } from "@ant-design/icons";
import "./Diary.css";
import ReactMarkdown from "react-markdown";
import { useContext } from "react";
import { DiaryContext } from "../../providers/diary-provider";
import { useNavigate } from "react-router";

interface IProps {
  note: string;
  id: number;
  day: number;
}

const Diary = ({ note, id, day }: IProps) => {
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
      const updatedNotes = existingDiary.notes
        ? existingDiary.notes.filter((_, index) => index !== id)
        : [];

      updateDiary(existingDiary.id, {
        ...existingDiary,
        notes: updatedNotes,
      });
    }
    navigate("/diaryPage");
  }
  const goToEdit = (id: number, day: number) => {
    navigate(`/EditNote/${day}/${id}`);
  };

  return (
    <div className="diary_content" >
      <div className="diary_notes">
        <span onClick={() => goToEdit(id, day)} className="span_note"><ReactMarkdown>{note}</ReactMarkdown></span>
        <DeleteOutlined className="del_icon" onClick={() => del_diary(id, day)} />
      </div>
    </div>
  );
};

export default Diary;
