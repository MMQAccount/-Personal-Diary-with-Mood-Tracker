import { useNavigate } from "react-router";
import "./Diary.css";

interface IProps {
  id:number;
  images: string[]
}

const ImageDiary = ({ images, id }: IProps) => {
  const navigate = useNavigate();
  const displayImages = () => {
    navigate(`/DiaryImages/${id}`);
  }
  return (
    <div onClick={displayImages}>
      <h2>Photos 🖼️</h2>
      <div className="image_note">
        {images.map((d, i) => (<img key={i} src={d} alt=""/>))}
      </div>
    </div>
  );
};

export default ImageDiary;
