import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import { DiaryContext } from "../../providers/diary-provider";
import ReactMarkdown from "react-markdown";

type IParams = { id: string; };

const DiaryDetailsPage = () => {
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
        <h2 >Product not found</h2>
      </div>
    );
  }

  return (
    <div >
      <h3>{diaryEx?.title}</h3>
      <ReactMarkdown>{diaryEx?.notes}</ReactMarkdown>
      <h3>{diaryEx?.state}</h3>
    </div>
  );
};

export default DiaryDetailsPage;