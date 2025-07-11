import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import { DiaryContext } from "../../providers/diary-provider";
import ReactMarkdown from "react-markdown";
import './DiaryDetails.css';

type IParams = { id: string; };

const DiaryDetailsPage = () => {
const emojis = ['😭', '🙁', '😐', '☺️', '😁'];  const { diary } = useContext(DiaryContext);

  const params = useParams<IParams>();
  const [diaryEx, setDiaryEx] = useState<Store.IDayDiary>();

  useEffect(() => {
    const p = diary?.find(d => d.id === Number(params.id));
    setDiaryEx(p);
  }, [params, diary]);

  if (!diary) {
    return (
      <div >
        <h2>Diary not found</h2>
      </div>
    );
  }

  return (
    <div className="main_container">
      <div className="diary_content_container">
        <h1>{diaryEx?.title}</h1>
        
        <div className="content">
          <h3>{diaryEx?.state ? emojis[diaryEx.state] : ""}</h3>
          |
          <p>
            {diaryEx?.type}
          </p>
        </div>
      </div>

    </div>
  );
};

export default DiaryDetailsPage;