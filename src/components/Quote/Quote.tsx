import { HeartFilled, HeartOutlined } from "@ant-design/icons";
import "./quote.css";
interface IProps {
  quoteData: IQuote;
  onToggleFav: (id: number) => void;
}
const Quote = (props: IProps) => {
  const { quoteData, onToggleFav } = props;
  const handleFavClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // prevent triggering the scroll
    onToggleFav(quoteData.id);
  };
  return (
    <div
      className="quoteBackground"
      style={{ backgroundImage: `url(${props.quoteData.background})` }}
    >
      <div className="quoteBlur">
        <div className="quote">
          <h2>{props.quoteData.quote}</h2>
          <p>{props.quoteData.author}</p>
          <button className="favQuoteButton" onClick={handleFavClick}>
            {quoteData.isFav ? <HeartFilled /> : <HeartOutlined />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Quote;
