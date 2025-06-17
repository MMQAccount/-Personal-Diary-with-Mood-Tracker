import { EditOutlined } from '@ant-design/icons';
import './Diary.css';
import ReactMarkdown from 'react-markdown';

interface IProps {
  title: string;
  notes: string;
  state: number;
  image?: string;
}

const Diary = ({ title, notes, state, image }: IProps) => {
  const emojis = ['😔', '😐', '🙂', '☺️', '😄'];

  return (
    <div className="container">
      <div className="diary_content">
        <EditOutlined className="edit_icon" />
        <div>
          <h3>{title}</h3>
          <ReactMarkdown>{notes}</ReactMarkdown>
        </div>
        <h1>{emojis[state]}</h1>
      </div>
      <div className="imgcontainer">
        {image?.length ? <img src={image} alt="" /> : null}
      </div>
    </div>
  );
};

export default Diary;
