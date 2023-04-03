import "./HighlightedText.css";

const HighlightedText = ({ text, image, backgroundColor = "#687499", textColor = "#fff" }) => {
  return (
    <div className="highlighted-text-container" style={{ backgroundColor: backgroundColor, color: textColor }}>
      {image ? (
        <div className="highlighted-img">
          <img src={image} alt="highlighted" draggable={false} />
        </div>
      ) : null}
      <div className="highlighted-text">{text}</div>
    </div>
  );
};

export default HighlightedText;
