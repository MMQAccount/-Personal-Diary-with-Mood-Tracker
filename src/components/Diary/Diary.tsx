import "./Diary.css";
import ReactMarkdown from "react-markdown";

interface IProps {
  diarys: Store.IDiaryItem[]
}

const Diary = ({ diarys }: IProps) => {
  return (
    <div className="diary_content">
      <h2>Notes 📝</h2>
      {diarys.map(d => (
        <div className="data_container">
          <div className="top_content">
            <h1>{d.title.charAt(0).toUpperCase() + d.title.slice(1)}</h1>
          </div>
          <div className="diary_notes">
            <ReactMarkdown>{d.notes}</ReactMarkdown>
          </div>
          <div className="state_type">
            <h2>{d.type.join(", ")}</h2>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Diary;
