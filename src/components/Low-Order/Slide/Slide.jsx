import React from "react";

const Slide = ({ image, active }) => {
	return (
		<div className={`slide${active ? " active" : ""}`}>
			<img src={image} alt=""></img>
		</div>
	);
};

export default Slide;