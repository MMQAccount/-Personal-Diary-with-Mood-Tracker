import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import { DiaryContext } from "../../providers/diary-provider";
import './DiaryDetails.css';
import { customMoodEmojisMap } from "../../constants/mood-no";
import { nameToIcon } from "../../components/MoodLineChart/MoodLineChart";
import { useUserData } from "../../providers/user-provider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type IParams = { id: string; };

const DiaryDetailsPage = () => {
  const { user } = useUserData();

  const emojis = user?.customMoodEmojis;

  const { diary } = useContext(DiaryContext);
  const params = useParams<IParams>();
  const [diaryEx, setDiaryEx] = useState<Store.IDayDiary>();
  const moodKey = customMoodEmojisMap[diaryEx?.state ?? -1] as keyof typeof emojis;
  const iconName = emojis?.[moodKey] ?? "";
  const iconDef = nameToIcon[iconName];
  useEffect(() => {
    const p = diary?.find(d => d._id === params.id);
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
          <h3>{iconDef ? (
            <FontAwesomeIcon icon={iconDef} />
          ) : (
            ""
          )}</h3>
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