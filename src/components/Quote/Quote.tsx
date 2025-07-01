import { HeartFilled, HeartOutlined } from "@ant-design/icons";
import "./quote.css";
interface IProps {
  quoteData: IQuote;
  onToggleFav: (id: number) => void;
  theme: "nature" | "solid";
}
const Quote = (props: IProps) => {
  const { quoteData, onToggleFav, theme } = props;
  const backgroundStyle =
    theme === "nature"
      ? {
          backgroundImage: `url(${quoteData.background})`,
        }
      : { backgroundColor: quoteData.color };

  const handleFavClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // prevent triggering the scroll
    onToggleFav(quoteData.id);
  };

  return (
    <div className="quoteBackground" style={backgroundStyle}>
      <div className="quoteBlur">
        <div className="quote">
          <h2>"{props.quoteData.quote}"</h2>
          <p>
            <i>{props.quoteData.author}</i>{" "}
          </p>
          <button className="favQuoteButton" onClick={handleFavClick}>
            {quoteData.isFav ? <HeartFilled /> : <HeartOutlined />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Quote;
