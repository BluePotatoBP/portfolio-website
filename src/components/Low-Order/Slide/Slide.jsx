import React from "react";
import ImageControls from "../ImageControls/ImageControls";

const Slide = ({ image, active }) => {
	return (
		<div className={`slide${active ? " active" : ""}`}>
			<ImageControls src={image}></ImageControls>
		</div>
	);
};

export default Slide;