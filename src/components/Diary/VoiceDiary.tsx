import "./Diary.css";

interface IProps {
  voices: Store.IDiaryItem[]
}

const VoiceDiary = ({ voices }: IProps) => {
  return (
    <div className="diary_content">
      {/* <div className="top_content">
          <EditOutlined className="edit_icon"/>
        </div> */}
      <h2>Voices 🎙️</h2>
      <div className="image_note">
        {voices.map(d => (d.audio ? <audio src={d.audio} controls /> : ""))}
      </div>
    </div>
  );
};

export default VoiceDiary;
