import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { DiaryContext } from "../../providers/diary-provider";
import './DiaryDetails.css';
import { DeleteOutlined } from "@ant-design/icons";

const DiaryImages = () => {
  const { id } = useParams<{ id: string }>();
  const { diary, updateDiary } = useContext(DiaryContext);
  const [filteredData, setFilteredData] = useState<Store.IDayDiary[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const numericId = Number(id);
    const matching = diary.filter(d => d.id === numericId);

    setFilteredData(matching);
  }, [id, diary]);

  const del_diary = (index: number, dayId: number) => {
    const diaryDay = new Date(dayId);
    diaryDay.setHours(0, 0, 0, 0);
    const dayTimestamp = diaryDay.getTime();

    const existingDiary = diary.find(d => {
      const entryDate = new Date(d.id);
      entryDate.setHours(0, 0, 0, 0);
      return entryDate.getTime() === dayTimestamp;
    });

    if (existingDiary) {
      const updatedImages = existingDiary.images
        ? existingDiary.images.filter((_, i) => i !== index)
        : [];

      updateDiary(existingDiary._id, {
        ...existingDiary,
        images: updatedImages,
      });
    }
  };

  return (
    <div className="main_container">
      <div className="imgcontainer">
        {filteredData.map(d => (
          <div key={d.id} className="image_note">
            {d.images!.map((img, index) => (
              <div className="img_cont" key={index}>
                <img src={img} alt={`Diary image ${index + 1}`} />
                <DeleteOutlined
                  className="del_icon"
                  onClick={() => del_diary(index, Number(id))}
                />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DiaryImages;
