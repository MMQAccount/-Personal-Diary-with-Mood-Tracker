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
  const [showScrollHint, setShowScrollHint] = useState(true);
  const [quotes, setQuotes] = useState<IQuote[]>([]);
  const [originalQuotes, setOriginalQuotes] = useState<IQuote[]>([]);
  const [colors, setColors] = useState<IQuoteBgColor[]>([]);
  const [images, setImages] = useState<IQuoteBgImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [theme, setTheme] = useState<"nature" | "solid">("nature");
  const [quoteFilter, setQuoteFilter] = useState<"all" | "fav">("all");
  const [fullScreen, setFullScreen] = useState(false);
  const [showTopArrow, setShowTopArrow] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowScrollHint(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

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
            "src/assets/blank-white-background-xbsfzsltjksfompa.jpg",
          color: color?.backgroundColor || "#fff",
        };
      });
    });
    setTimeout(() => {
      const container = containerRef.current;
      if (container) {
        setShowTopArrow(false);
      }
    }, 100);
  }, [originalQuotes, images, colors, websiteTheme]);

  const filteredQuotes =
    quoteFilter === "fav" ? quotes.filter((quote) => quote.isFav) : quotes;

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let lastScrollTime = Date.now();
    const scrollThreshold = 100;

    const handleScroll = () => {
      const now = Date.now();
      const isNaturalScroll = now - lastScrollTime > scrollThreshold;
      lastScrollTime = now;

      const { scrollTop, scrollHeight, clientHeight } = container;
      const atBottom = scrollHeight - (scrollTop + clientHeight) < 10;

      if (atBottom && isNaturalScroll) {
        setTimeout(() => {
          container.scrollTo({ top: 0, behavior: "smooth" });
        }, 300);
      }

      setShowTopArrow(scrollTop > 10);
    };

    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollDownOneQuote = () => {
    const container = containerRef.current;
    if (!container) return;

    const scrollAmount = window.innerHeight;
    const nextScrollTop = container.scrollTop + scrollAmount;
    const maxScroll = container.scrollHeight - container.clientHeight;

    if (nextScrollTop > maxScroll) {
      container.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      container.scrollBy({ top: scrollAmount, behavior: "smooth" });
    }
  };
  const scrollUpOneQuote = () => {
    const container = containerRef.current;
    if (!container) return;

    const scrollAmount = window.innerHeight;
    const newScrollTop = container.scrollTop - scrollAmount;

    container.scrollTo({
      top: Math.max(0, newScrollTop),
      behavior: "smooth",
    });
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
      {showScrollHint && (
        <div className="scroll-hint-notification">
          <span>💡Scroll to navigate between quotes</span>
        </div>
      )}
      <div className="quotesContainer" ref={containerRef}>
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
            {showTopArrow && (
              <div
                className={`top-arrow ${fullScreen ? "light" : ""}`}
                onClick={(e) => {
                  e.stopPropagation();
                  scrollUpOneQuote();
                }}
              >
                <UpOutlined />
              </div>
            )}

            <div
              className={`bottom-arrow ${fullScreen ? "light" : ""}`}
              onClick={(e) => {
                e.stopPropagation();
                scrollDownOneQuote();
              }}
            >
              <DownOutlined />
            </div>

            <Popup
              trigger={
                <button className="settingsButton">{<BarsOutlined />}</button>
              }
              modal
              nested
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
