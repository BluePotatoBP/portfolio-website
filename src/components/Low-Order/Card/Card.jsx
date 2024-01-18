import "./Card.css";
import React, { useRef, useEffect } from "react";
import { Link } from "react-router-dom";

const Card = ({ decoration }) => {
	const cardContainerRef = useRef(null);
	const cardRef = useRef(null);

	// Get the average color of the thumbnail
	useEffect(() => {
		const thumbnailImg = new Image();
		thumbnailImg.crossOrigin = "anonymous";
		thumbnailImg.src = decoration.thumbnail || "./missing.svg";
		thumbnailImg.onload = () => {
			const { red, green, blue } = calculateAverageColor(thumbnailImg);

			cardRef.current.style.background = `linear-gradient(180deg, rgba(100, 100, 100, 0.1), rgba(${red}, ${green}, ${blue}, 0.3))`;
			cardContainerRef.current.style.background = `linear-gradient(180deg, transparent, transparent, rgba(${red}, ${green}, ${blue}, 0.1))`;
		};
	}, [decoration.thumbnail]);

	// Crop the name and description if they are too long
	const croppedName = decoration.decoName.length > 20 ? decoration.decoName.substring(0, 20) + "..." : decoration.decoName;
	const croppedDesc = decoration.shortDesc.length > 42 ? decoration.shortDesc.substring(0, 42) + "..." : decoration.shortDesc;

	return (
		<Link to={`/projects/${decoration.name}`} className="card-container" ref={cardContainerRef}>
			<div className="card" ref={cardRef}>
				<div className="thumbnail-container" style={{ backgroundImage: `url(${decoration.thumbnail || process.env.PUBLIC_URL + "./missing.svg"})`}} />
				<div className="text-container">
					<div className="card-title">{croppedName}</div>
					<div className="card-description">{croppedDesc}</div>
				</div>
			</div>
		</Link>
	);
};

/**
 * Highly customizable average color calculator
 * @param {Image} thumbnailImg Image instance
 * @returns red, green and blue average color
 */
const calculateAverageColor = (thumbnailImg) => {
	const canvas = document.createElement("canvas");
	// Resizing image for performance
	const resizeFactor = 0.1;
	canvas.width = thumbnailImg.width * resizeFactor;
	canvas.height = thumbnailImg.height * resizeFactor;
	// Create canvas and draw image
	const ctx = canvas.getContext("2d");
	ctx.drawImage(thumbnailImg, 0, 0, canvas.width, canvas.height);
	const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
	// Knobs and sliders
	const alphaThreshold = 255; // Exclude anything below x opacity
	const nthPixel = 80; // Check every Nth pixel, I found 40 to be accurate enough
	/* const clampThresholdLight = 20; */ // Clamp Highlights - works backwards from what you'd expect, so lower number = lighter colors
	const clampThresholdDark = 12; // Clamp Shadows - lower number lets in darker colors
	// Used in calculation, do not touch
	let r = 0,
		g = 0,
		b = 0,
		numPixels = 0,
		maxR = 0,
		maxG = 0,
		maxB = 0,
		minR = 255,
		minG = 255,
		minB = 255;
	// Filtering out noise and unwanted colors
	for (let i = 0; i < imageData.length; i += nthPixel) {
		const alpha = imageData[i + 3];
		// If the pixel is transparent past x, throw it out
		if (alpha >= alphaThreshold) {
			const curR = imageData[i];
			const curG = imageData[i + 1];
			const curB = imageData[i + 2];
			// If the color is too dark, throw it out
			if (rgbToLightness(curR, curG, curB) > clampThresholdDark) {
				r += curR;
				g += curG;
				b += curB;
				numPixels++;
				
				// Update min and max RGB values
				if (curR > maxR) maxR = curR;
				if (curG > maxG) maxG = curG;
				if (curB > maxB) maxB = curB;

				if (curR < minR) minR = curR;
				if (curG < minG) minG = curG;
				if (curB < minB) minB = curB;
			}
		}
	}

	// Averaged out color
	const backup = 100;
	const red = Math.floor(r / numPixels) ? Math.floor(r / numPixels) : backup;
	const green = Math.floor(g / numPixels) ? Math.floor(g / numPixels) : backup;
	const blue = Math.floor(b / numPixels) ? Math.floor(b / numPixels) : backup;

	return { red, green, blue };
};

/**
 * Helper function
 * @param {number} r Red channel
 * @param {number} g Green channel
 * @param {number} b Blue channel
 * @returns number ranging from 0 to 100
 */
function rgbToLightness(r, g, b) {
	r /= 255;
	g /= 255;
	b /= 255;

	const max = Math.max(r, g, b);
	const min = Math.min(r, g, b);

	const l = (max + min) / 2;

	return Math.floor(l * 100);
}

export default Card;