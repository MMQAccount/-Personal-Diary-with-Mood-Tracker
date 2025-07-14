import {
  HeartFilled,
  HeartOutlined,
  FullscreenExitOutlined,
  FullscreenOutlined,
} from "@ant-design/icons";
import "./quote.css";

interface IProps {
  quoteData: IQuote;
  onToggleFav: (id: number) => void;
  theme: "nature" | "solid";
  fullScreen: boolean;
  onToggleFullScreen: () => void;
}

const Quote = (props: IProps) => {
  const { quoteData, onToggleFav, theme } = props;

  const backgroundStyle =
    theme === "nature"
      ? {
          backgroundImage: `url(${quoteData.background})`,
        }
      : { backgroundColor: quoteData.color };

  const fullScreenStyle = props.fullScreen
    ? {
        width: "100%",
        borderRadius: "0px",
        height: "100vh",
      }
    : {
        height: "85vh",
        borderRadius: "20px",
      };

  const handleFavClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // prevent triggering the scroll
    onToggleFav(quoteData.id);
  };

  return (
    <div className="quoteCard">
      <div
        className="quoteBackground"
        style={{ ...backgroundStyle, ...fullScreenStyle }}
      >
        <div className="quoteBlur" style={fullScreenStyle}>
          <button
            className="fullScreenButton"
            onClick={(e) => {
              e.stopPropagation();
              props.onToggleFullScreen();
            }}
          >
            {props.fullScreen ? (
              <FullscreenExitOutlined />
            ) : (
              <FullscreenOutlined />
            )}
          </button>
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
    </div>
  );
};

export default Quote;
