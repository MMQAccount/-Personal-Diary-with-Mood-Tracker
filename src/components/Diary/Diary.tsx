import { EditOutlined } from "@ant-design/icons";
import "./Diary.css";
import ReactMarkdown from "react-markdown";
import { Link, useNavigate } from "react-router-dom";

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
  return (
    <Link to={`/dispalyDiary/${id}`} className="diary_content">
      <div className="container">
        <div className="diary_content">
          <div className="left_content">
            <Link to={`/DiaryEditPage/${id}`}>
              <EditOutlined className="edit_icon" />
            </Link>
            <div>
              <h3>{title.charAt(0).toUpperCase() + type.slice(1)}</h3>
              <ReactMarkdown>{notes}</ReactMarkdown>
            </div>
          </div>
          <div className="state_type">
            <h1>{emojis[state]}</h1>
            <h2>{type}</h2>
          </div>
        </div>
        <div className="imgcontainer">
          {image ? <img src={image} alt="" /> : null}
        </div>
      </div>
    </Link>
  );
};

export default Diary;
