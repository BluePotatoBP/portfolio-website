import "./Card.css";
import React, { useRef, useEffect } from "react";
import { Link } from "react-router-dom";

const Card = ({ decoration }) => {
	const thumbnailRef = useRef(null);
	const cardContainerRef = useRef(null);
	const cardRef = useRef(null);

	// Get the average color of the thumbnail
	useEffect(() => {
		const thumbnailImg = new Image();
		thumbnailImg.crossOrigin = "anonymous";
		thumbnailImg.onload = () => {
			const canvas = document.createElement("canvas");
			canvas.width = thumbnailImg.width;
			canvas.height = thumbnailImg.height;

			const ctx = canvas.getContext("2d");
			ctx.drawImage(thumbnailImg, 0, 0);

			const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height).data;

			let r = 0,
				g = 0,
				b = 0;

			for (let i = 0; i < imageData.length; i += 4) {
				r += imageData[i];
				g += imageData[i + 1];
				b += imageData[i + 2];
			}

			const numPixels = imageData.length / 4;
			const avgR = Math.floor(r / numPixels);
			const avgG = Math.floor(g / numPixels);
			const avgB = Math.floor(b / numPixels);

			cardRef.current.style.background = `linear-gradient(180deg, rgba(150, 150, 150, 0.1), rgba(150, 150, 150, 0.1), rgba(${avgR}, ${avgG}, ${avgB}, 0.5))`;
			cardContainerRef.current.style.background = `linear-gradient(180deg, transparent, transparent, rgba(${avgR}, ${avgG}, ${avgB}, 0.5))`;
		};
		thumbnailImg.src = decoration.thumbnail || "./missing.svg";
	}, [decoration.thumbnail]);
	// Crop the name and description if they are too long
	const croppedName = decoration.decoName.length > 20 ? decoration.decoName.substring(0, 20) + "..." : decoration.decoName;
	const croppedDesc = decoration.shortDesc.length > 42 ? decoration.shortDesc.substring(0, 42) + "..." : decoration.shortDesc;

	return (
		<Link to={`/projects/${decoration.name}`} className="card-container" ref={cardContainerRef}>
			<div className="card" ref={cardRef}>
				<div className="thumbnail-container" style={{ backgroundImage: `url(${decoration.thumbnail || process.env.PUBLIC_URL + "./missing.svg"})` }} ref={thumbnailRef} />
				<div className="text-container">
					<div className="card-title">{croppedName}</div>
					<div className="card-description">{croppedDesc}</div>
				</div>
			</div>
		</Link>
	);
};

export default Card;