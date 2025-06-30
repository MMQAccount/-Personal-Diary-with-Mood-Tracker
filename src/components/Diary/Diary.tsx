import { EditOutlined } from "@ant-design/icons";
import "./Diary.css";
import ReactMarkdown from "react-markdown";
import { useNavigate } from "react-router-dom";

interface IProps {
  id: number;
  title: string;
  notes: string;
  state: number;
  image?: string;
  type: string[];
  audio?: string;
}

const Diary = ({ id, title, notes, state, image, type, audio }: IProps) => {
  const emojis = ['😭', '🙁', '😐', '☺️', '😁'];
  const navigate = useNavigate();

  const handleEditClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigate(`/DiaryEditPage/${id}`);
  };
  const handleDiaryClick = () => {
    navigate(`/dispalyDiary/${id}`);
  };

  return (
    <div className="diary_content" onClick={handleDiaryClick}>
      <div className="data_container">
        <div className="top_content">
          <h1>{title.charAt(0).toUpperCase() + title.slice(1)}</h1>
          <EditOutlined className="edit_icon" onClick={handleEditClick} />
        </div>
        <div className="diary_notes">
          <ReactMarkdown>{notes}</ReactMarkdown>
          {audio ? <audio src={audio} controls /> : ""}
          <div className="image_note">
            {image ? <img src={image} alt="" /> : ""}
          </div>
        </div>
        <div className="state_type">
          <h1>{emojis[state]}</h1>
          <h2>{type.join(", ")}</h2>
        </div>
      </div>
    </div>
  );
};

export default Diary;
