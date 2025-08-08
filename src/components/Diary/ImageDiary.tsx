import React from "react";
import { useNavigate } from "react-router";
import { useTranslation } from "react-i18next";
import "./Diary.css";

interface IProps {
  id: number;
  images: string[];
}

const ImageDiary = ({ images, id }: IProps) => {
  const navigate = useNavigate();
  const { t } = useTranslation("diary");

  const displayImages = () => {
    navigate(`/DiaryImages/${id}`);
  };

  return (
    <div onClick={displayImages} className="image_content">
      <div className="image_note">
        {images.map((src, i) => (
          <img key={i} src={src} alt={t("photo_alt") || "photo"} />
        ))}
      </div>
    </div>
  );
};

export default ImageDiary;
