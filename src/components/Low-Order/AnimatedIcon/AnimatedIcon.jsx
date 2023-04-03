import React from "react";
import { Link } from "react-router-dom";

import "./AnimatedIcon.css";

const AnimatedIcon = ({fontSize = "2.4rem", isLink = true}) => {
	if(isLink) {
		return (
			<Link to="/" draggable={false} style={{ fontSize: fontSize, userSelect: "none" }} className="animated_logo">
				&#9863;
			</Link>
		);
	} else {
		return (
			<div style={{ fontSize: fontSize, userSelect: "none" }} className="animated_logo">
				&#9863;
			</div>
		);
	}
};

export default AnimatedIcon;
