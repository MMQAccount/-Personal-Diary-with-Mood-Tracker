import {
  HeartFilled,
  HeartOutlined,
  FullscreenExitOutlined,
  FullscreenOutlined,
} from "@ant-design/icons";
import "./quote.css";
import { useState } from "react";

interface IProps {
  quoteData: IQuote;
  onToggleFav: (id: number) => void;
  theme: "nature" | "solid";
}

const Quote = (props: IProps) => {
  const [fullScreen, setFullScreen] = useState(false);
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
  const handleFullScreenClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setFullScreen(!fullScreen);
  };
  return (
    <div className="quoteCard">
      <div className="quoteBackground" style={backgroundStyle}>
        <div className="quoteBlur">
          <button className="fullScreenButton" onClick={handleFullScreenClick}>
            {fullScreen ? <FullscreenExitOutlined /> : <FullscreenOutlined />}
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
