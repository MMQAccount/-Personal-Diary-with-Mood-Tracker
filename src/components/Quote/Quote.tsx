import "./quote.css";
interface IProps {
  quoteData: IQuote;
}
const Quote = (props: IProps) => {
  return (
    <div
      className="quoteBackground"
      style={{ backgroundImage: `url(${props.quoteData.background})` }}
    >
      <div className="quoteBlur">
        <div className="quote">
          <h2>{props.quoteData.quote}</h2>
          <p>{props.quoteData.author}</p>
        </div>
      </div>
    </div>
  );
};

export default Quote;
