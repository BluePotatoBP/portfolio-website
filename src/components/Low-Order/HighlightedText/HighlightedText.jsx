import "./HighlightedText.css";

const HighlightedText = (
	{
		text,
		image,
		backgroundColor = "#3e455b",
		textColor = "#fff",
		textShadowColor = null,
		textShadowSize = "10px",
		padding = "0 0.2rem 0 0.2rem",
		margin = "0 0.2rem 0 0.2rem",
		borderRadius = "0.2rem"
	}) => {

	const textShadowStyle = textShadowColor ? `1px 1px ${textShadowSize} ${textShadowColor}` : null

	return (
		<div className="highlighted-text-container" style={{ backgroundColor: backgroundColor, color: textColor, padding: padding, margin: margin, borderRadius: borderRadius }}>
			{image ? (
				<div className="highlighted-img">
					<img src={image} alt="highlighted" draggable={false} />
				</div>
			) : null}
			<div className="highlighted-text" style={{ textShadow: textShadowStyle }}>{text}</div>
		</div>
	);
};

export default HighlightedText;
