import "./Card.css";
import React, { useRef, useEffect } from "react";
import { Link } from "react-router-dom";

const calculateAverageColor = (thumbnailImg) => {
	const canvas = document.createElement("canvas");
	const resizeFactor = 0.1; // Resize the image to a smaller size to speed up calculations
	canvas.width = thumbnailImg.width * resizeFactor;
	canvas.height = thumbnailImg.height * resizeFactor;

	const ctx = canvas.getContext("2d");
	ctx.drawImage(thumbnailImg, 0, 0, canvas.width, canvas.height);

	const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
	const alphaThreshold = 255; // Exclude anything below x opacity 
	const nthPixel = 10; // Check every Nth pixel
	const clampThresholdLight = 60; // Clamp Highlights
	const clampThresholdDark = 10; // Clamp Shadows

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

	for (let i = 0; i < imageData.length; i += 4 * nthPixel) {
		const alpha = imageData[i + 3];
		if (alpha >= alphaThreshold) {
			const curR = imageData[i];
			const curG = imageData[i + 1];
			const curB = imageData[i + 2];

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

	const avgR = Math.floor(r / numPixels);
	const avgG = Math.floor(g / numPixels);
	const avgB = Math.floor(b / numPixels);

	// Clamp the RGB values based on the min and max RGB values
	const clampedR = Math.max(Math.min(avgR, maxR - clampThresholdLight), minR + clampThresholdDark);
	const clampedG = Math.max(Math.min(avgG, maxG - clampThresholdLight), minG + clampThresholdDark);
	const clampedB = Math.max(Math.min(avgB, maxB - clampThresholdLight), minB + clampThresholdDark);

	return { clampedR, clampedG, clampedB };
};

const Card = ({ decoration }) => {
	const cardContainerRef = useRef(null);
	const cardRef = useRef(null);

	// Get the average color of the thumbnail
	useEffect(() => {
		const thumbnailImg = new Image();
		thumbnailImg.crossOrigin = "anonymous";
		thumbnailImg.onload = () => {
			const { clampedR, clampedG, clampedB } = calculateAverageColor(thumbnailImg);

			cardRef.current.style.background = `linear-gradient(180deg, rgba(150, 150, 150, 0.1), rgba(150, 150, 150, 0.1), rgba(150, 150, 150, 0.1), rgba(${clampedR}, ${clampedG}, ${clampedB}, 0.3))`;
			cardContainerRef.current.style.background = `linear-gradient(180deg, transparent, transparent, transparent, rgba(${clampedR}, ${clampedG}, ${clampedB}, 0.3))`;
		};
		thumbnailImg.src = decoration.thumbnail || "./missing.svg";
	}, [decoration.thumbnail]);

	// Crop the name and description if they are too long
	const croppedName = decoration.decoName.length > 20 ? decoration.decoName.substring(0, 20) + "..." : decoration.decoName;
	const croppedDesc = decoration.shortDesc.length > 42 ? decoration.shortDesc.substring(0, 42) + "..." : decoration.shortDesc;

	return (
		<Link to={`/projects/${decoration.name}`} className="card-container" ref={cardContainerRef}>
			<div className="card" ref={cardRef}>
				<div className="thumbnail-container" style={{ backgroundImage: `url(${decoration.thumbnail || process.env.PUBLIC_URL + "./missing.svg"})` }} />
				<div className="text-container">
					<div className="card-title">{croppedName}</div>
					<div className="card-description">{croppedDesc}</div>
				</div>
			</div>
		</Link>
	);
};

export default Card;