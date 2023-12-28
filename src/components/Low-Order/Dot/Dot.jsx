import React from "react";

const Dot = ({ active, onClick }) => {
	return (<span className={`dot ${active ? "active" : ""}`} onClick={onClick}>•</span>);
};

export default Dot;
