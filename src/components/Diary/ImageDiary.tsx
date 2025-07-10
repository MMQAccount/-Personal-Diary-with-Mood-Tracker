import "./Diary.css";

interface IProps {
  images: string[]
}

const ImageDiary = ({ images }: IProps) => {
  return (
    <div className="diary_content">
      {/* <div className="top_content">
          <EditOutlined className="edit_icon"/>
        </div> */}
      <h2>Photos 🖼️</h2>
      <div className="image_note">
        {images.map(d => (<img src={d} alt="" />))}
      </div>
    </div>
  );
};

export default ImageDiary;
