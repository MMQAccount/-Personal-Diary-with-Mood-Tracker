import Quote from "../../components/Quote/Quote";
import { useRef, useState, useEffect } from "react";
import Popup from "reactjs-popup";
import {
  BarsOutlined,
  CloseCircleOutlined,
  UpOutlined,
  DownOutlined,
} from "@ant-design/icons";
import "reactjs-popup/dist/index.css";
import "./quotesPage.css";
import { useTheme } from "../../utils/ThemeContext";
import { fetchQuotes } from "../../services/quote.service";
import { fetchQuoteBgColors } from "../../services/quoteBgColor.service";
import { fetchQuoteBgImages } from "../../services/quoteBgImage.service";
import { Alert, Spin } from "antd";

const QuotesPage = () => {
  const { selectedColor } = useTheme();
  const websiteTheme = selectedColor === "Purple" ? "purple" : "green";

  const containerRef = useRef<HTMLDivElement>(null);

  const [quotes, setQuotes] = useState<IQuote[]>([]);
  const [originalQuotes, setOriginalQuotes] = useState<IQuote[]>([]);
  const [colors, setColors] = useState<IQuoteBgColor[]>([]);
  const [images, setImages] = useState<IQuoteBgImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [theme, setTheme] = useState<"nature" | "solid">("nature");
  const [quoteFilter, setQuoteFilter] = useState<"all" | "fav">("all");
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [fullScreen, setFullScreen] = useState(false);

  useEffect(() => {
    const loadQuotes = async () => {
      setLoading(true);
      try {
        const fetchedQuotes = await fetchQuotes();
        setOriginalQuotes(fetchedQuotes);
        const fetchedColors = await fetchQuoteBgColors();
        setColors(fetchedColors);
        const fetchedImages = await fetchQuoteBgImages();
        setImages(fetchedImages);
        setError(null);
      } catch (err: any) {
        setError(err.message || "Failed to fetch quotes");
      } finally {
        setLoading(false);
      }
    };
    loadQuotes();
  }, []);

  useEffect(() => {
    const themedImages = images.filter((img) => img.theme === websiteTheme);
    const themedColors = colors.filter((color) => color.theme === websiteTheme);

    setQuotes(() => {
      return originalQuotes.map((quote, index) => {
        const bgIndex = index % themedImages.length;
        const colorIndex = index % themedColors.length;

        const bg = themedImages[bgIndex];
        const color = themedColors[colorIndex];

        return {
          ...quote,
          background:
            bg?.backgroundImage ||
            "src/assets/wallpaperflare.com_wallpaper-5.jpg",
          color: color?.backgroundColor || "#fff",
        };
      });
    });
  }, [originalQuotes, images, colors, websiteTheme]);

  const filteredQuotes =
    quoteFilter === "fav" ? quotes.filter((quote) => quote.isFav) : quotes;

  const handleClick = () => {
    const container = containerRef.current;
    if (!container) return;

    const scrollAmount = window.innerHeight;
    const maxScroll = container.scrollHeight - container.clientHeight;
    const nextScrollTop = container.scrollTop + scrollAmount;

    if (nextScrollTop > maxScroll) {
      container.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    } else {
      container.scrollBy({
        top: scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const toggleFavorite = (id: number) => {
    setQuotes((prevQuotes) =>
      prevQuotes.map((quote) =>
        quote._id === id ? { ...quote, isFav: !quote.isFav } : quote
      )
    );
  };

  return (
    <>
      <div
        className="quotesContainer"
        ref={containerRef}
        onClick={() => {
          if (!isPopupOpen) handleClick();
        }}
      >
        {loading && (
          <div className="loading-state">
            <Spin size="large" />
          </div>
        )}
        {error && (
          <div className="error-state">
            <Alert message={error} type="error" />
          </div>
        )}
        {!loading && !error && (
          <>
            <div
              className={`top-arrow ${fullScreen ? "light" : ""}`}
              onClick={() =>
                containerRef.current?.scrollTo({ top: 0, behavior: "smooth" })
              }
            >
              <UpOutlined />
            </div>
            <div
              className={`bottom-arrow ${fullScreen ? "light" : ""}`}
              onClick={() => {
                const container = containerRef.current;
                if (container) {
                  container.scrollTo({
                    top: container.scrollHeight,
                    behavior: "smooth",
                  });
                }
              }}
            >
              {" "}
              <DownOutlined />
            </div>

            <Popup
              trigger={
                <button className="settingsButton">{<BarsOutlined />}</button>
              }
              modal
              nested
              onOpen={() => setIsPopupOpen(true)}
              onClose={() => setIsPopupOpen(false)}
            >
              {
                ((close: () => void) => (
                  <div>
                    <div>
                      <h2>Themes</h2>
                      <div className="optionGroup">
                        <button
                          className={
                            theme === "nature" ? "option selected" : "option"
                          }
                          onClick={() => setTheme("nature")}
                        >
                          Nature
                        </button>
                        <button
                          className={
                            theme === "solid" ? "option selected" : "option"
                          }
                          onClick={() => setTheme("solid")}
                        >
                          Solid Color
                        </button>
                      </div>
                      <hr />
                      <div>
                        <h2>Quotes</h2>
                        <div className="optionGroup">
                          <button
                            className={
                              quoteFilter === "all"
                                ? "option selected"
                                : "option"
                            }
                            onClick={() => setQuoteFilter("all")}
                          >
                            All Quotes
                          </button>
                          <button
                            className={
                              quoteFilter === "fav"
                                ? "option selected"
                                : "option"
                            }
                            onClick={() => setQuoteFilter("fav")}
                          >
                            Favorite Only
                          </button>
                        </div>
                      </div>
                    </div>
                    <div>
                      <button onClick={close} className="popupCloseBotton">
                        <CloseCircleOutlined />
                      </button>
                    </div>
                  </div>
                )) as unknown as React.ReactNode
              }
            </Popup>

            {Boolean(filteredQuotes.length) && !error && !loading ? (
              filteredQuotes.map((quote) => (
                <Quote
                  key={quote._id}
                  quoteData={quote}
                  onToggleFav={toggleFavorite}
                  theme={theme}
                  fullScreen={fullScreen}
                  onToggleFullScreen={() => setFullScreen((prev) => !prev)}
                />
              ))
            ) : (
              <div className="noQuotes">
                <h3>Can't Find Any Quotes</h3>
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default QuotesPage;
