import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import { DiaryContext } from "../../providers/diary-provider";
import ReactMarkdown from "react-markdown";
import './DiaryDetails.css';

type IParams = { id: string; };

const DiaryDetailsPage = () => {
      const emojis = ["😔", "😐", "🙂", "☺️", "😄"];
  const { diary } = useContext(DiaryContext);

  const params = useParams<IParams>();
  const [diaryEx, setDiaryEx] = useState<Store.IDiaryItem>();

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
    <div className="diary_content_container">
      <div className="content">
          <h1>{diaryEx?.title}</h1>
        <h1>{diaryEx?.state ? emojis[diaryEx.state] : ""}</h1>
      </div>
      <ReactMarkdown>{diaryEx?.notes}</ReactMarkdown>
       <div className="imgcontainer">
          {diaryEx?.image ? <img src={diaryEx.image} alt="" /> : null}
        </div>
    </div>
  );
};

export default DiaryDetailsPage;