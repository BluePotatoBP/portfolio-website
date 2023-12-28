import "./HighlightedText.css";
import { Link } from "react-router-dom"

const HighlightedText = (
	{
		text,
		image,
		link,
		backgroundColor = "#3e455b",
		textColor = "#fff",
		textShadowColor = null,
		textShadowSize = "10px",
		padding = "0 0.5rem 0 0.5rem",
		margin = "0 0.2rem 0 0.2rem",
		borderRadius = "0.5rem"
	}
) => {
	const textShadowStyle = textShadowColor ? `1px 1px ${textShadowSize} ${textShadowColor}` : null
	const styling = { backgroundColor: backgroundColor, color: textColor, padding: padding, margin: margin, borderRadius: borderRadius }

	const imageElement = (
		<div className="highlighted-img">
			<img src={image} alt="highlighted" draggable={false} />
		</div>
	)

	// If theres a link use react router
	if (link) {
		return (
			<Link to={link ? link : null} className="highlighted-text-container" style={styling}>
				{image ? imageElement : null}
				<div className="highlighted-text" style={{ textShadow: textShadowStyle }}>{text}</div>
			</Link>
		);
	} else {
		return (
			<div to={link ? link : null} className="highlighted-text-container" style={styling}>
				{image ? imageElement : null}
				<div className="highlighted-text" style={{ textShadow: textShadowStyle }}>{text}</div>
			</div>
		);
	}
};

export default HighlightedText;
