import Quote from "../../components/Quote/Quote";
import { useRef } from "react";
import "./quotesPage.css";

const quotesData: IQuote[] = [
  {
    id: 1,
    quote: "The only way to do great work is to love what you do.",
    author: "Steve Jobs",
    background: "src/assets/simona-sergi-b_9Nf_aLTyk-unsplash.jpg",
    color: "#A290D1", // Lavender Purple
  },
  {
    id: 2,
    quote: "Success is not in what you have, but who you are.",
    author: "Bo Bennett",
    background: "src/assets/joyce-toh-3PdHzNqMYbA-unsplash.jpg",

    color: "#D5D9F1", // Soft Lilac
  },
  {
    id: 3,
    quote:
      "What you get by achieving your goals is not as important as what you become by achieving your goals.",
    author: "Zig Ziglar",
    background: "src/assets/micheile-henderson-Klq6refBGCg-unsplash.jpg",

    color: "#8661C1", // Medium Purple
  },
  {
    id: 4,
    quote: "Believe you can and you're halfway there.",
    author: "Theodore Roosevelt",
    background: "src/assets/rodion-kutsaiev-8P-uQaTd8rw-unsplash.jpg",

    color: "#C6B9E3", // Pastel Purple
  },
  {
    id: 5,
    quote: "Act as if what you do makes a difference. It does.",
    author: "William James",
    background: "src/assets/neon-wang-ij4YFs9ADQI-unsplash.jpg",

    color: "#EDF0F8", // Warm Grey Blue
  },
];

const QuotesPage = () => {
  const containerRef = useRef<HTMLDivElement>(null);

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

  return (
    <div className="quotesContainer" ref={containerRef} onClick={handleClick}>
      {Boolean(quotesData.length) ? (
        quotesData.map((quote) => <Quote key={quote.id} quoteData={quote} />)
      ) : (
        <h3>Can't Find Any Quotes</h3>
      )}
    </div>
  );
};

export default QuotesPage;
