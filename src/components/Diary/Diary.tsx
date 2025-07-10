import "./Diary.css";
import ReactMarkdown from "react-markdown";

interface IProps {
  note: string;
}

const Diary = ({ note }: IProps) => {
  return (
    <div className="diary_content">
      <div className="data_container">
        <div className="diary_notes">
          <ReactMarkdown>{note}</ReactMarkdown>
        </div>
      </div>
    </div>
  );
};

export default Diary;
