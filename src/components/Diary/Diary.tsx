import { EditOutlined } from "@ant-design/icons";
import "./Diary.css";
import ReactMarkdown from "react-markdown";
import { Link, useNavigate } from "react-router-dom";
import Markdown from "react-markdown";

interface IProps {
  id: number;
  title: string;
  notes: string;
  state: number;
  image?: string;
  type: string;
}

const Diary = ({ id, title, notes, state, image, type }: IProps) => {
  const emojis = ["😔", "😐", "🙂", "☺️", "😄"];
  const navigate = useNavigate();
  const handleEditClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigate(`/DiaryEditPage/${id}`);
  };
  const handleDiaryClick = () => {
    navigate(`/dispalyDiary/${id}`);
  };
  return (
    <div className="container">
      <div className="diary_content" onClick={handleDiaryClick}>
        <div className="top_content">
          <h3>{title.charAt(0).toUpperCase() + title.slice(1)}</h3>
          <EditOutlined className="edit_icon" onClick={handleEditClick} />
        </div>
        <div className="diary_notes">
          <Markdown>{notes}</Markdown>
          <div className="imgcontainer">
            {image ? <img src={image} alt="" /> : null}
          </div>
        </div>
        <div className="state_type">
          <h1>{emojis[state]}</h1>
          <h2>{type}</h2>
        </div>
      </div>
    </div>
  );
};

export default Diary;
