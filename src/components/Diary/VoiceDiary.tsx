import "./Diary.css";

interface IProps {
  voice: string
}

const VoiceDiary = ({ voice }: IProps) => {
  return (
    <div className="diary_content">
      {/* <div className="top_content">
          <EditOutlined className="edit_icon"/>
        </div> */}
      <div className="image_note">
        {voice ? <audio src={voice} controls /> : ""}
      </div>
    </div>
  );
};

export default VoiceDiary;
