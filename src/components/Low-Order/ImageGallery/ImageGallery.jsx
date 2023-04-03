import React, { useState, useEffect, useRef } from "react";
import "./ImageGallery.css";

const ImageGallery = ({ images, autoplaySpeed = 3000, maxDots = 5 }) => {
	const [currentIndex, setCurrentIndex] = useState(0);
	const [isAutoPlaying, setIsAutoPlaying] = useState(true);

	const intervalRef = useRef(null);

	// Autoplay for images
	useEffect(() => {
		const changeImage = () => {
			const newIndex = currentIndex === images.length - 1 ? 0 : currentIndex + 1;
			setCurrentIndex(newIndex);
		};

		const startAutoplay = () => {
			if (images.length <= 1 || !isAutoPlaying) return;
			intervalRef.current = setInterval(() => {
				changeImage();
			}, autoplaySpeed);
		};

		startAutoplay();
		return () => stopAutoplay();
	}, [autoplaySpeed, images.length, currentIndex, isAutoPlaying]);

	const stopAutoplay = () => {
		clearInterval(intervalRef.current);
	};

	const handlePrevClick = () => {
		const newIndex = currentIndex === 0 ? images.length - 1 : currentIndex - 1;
		setCurrentIndex(newIndex);
		stopAutoplay();
	};

	const handleNextClick = () => {
		const newIndex = currentIndex === images.length - 1 ? 0 : currentIndex + 1;
		setCurrentIndex(newIndex);
		stopAutoplay();
	};

	const handleDotClick = (index) => {
		if (index === currentIndex) return;
		setCurrentIndex(index);
		stopAutoplay();
	};

	const handleMouseEnter = () => {
		setIsAutoPlaying(false);
		stopAutoplay();
	};

	const handleMouseLeave = () => {
		setIsAutoPlaying(true);
	};

	const renderDots = () => {
		if (images.length <= 1) return null;
		const maxDotsToShow = Math.min(maxDots, images.length);
		const dots = [];

		// Add dots
		for (let i = 0; i < maxDotsToShow; i++) {
			dots.push(<span key={i} className={`dot ${i === currentIndex ? "active" : ""}`} onClick={() => handleDotClick(i)}>&#8226;</span>);
		}

		// If theres more images than dots, add overflow dots
		if (images.length > maxDotsToShow) {
			dots.push(<span key={maxDotsToShow} className={`dot overflow ${currentIndex >= maxDots ? "active" : ""}`}>∙</span>);
			dots.unshift(<span key={maxDotsToShow + 1} className={`dot overflow ${currentIndex >= maxDots ? "active" : ""}`}>∙</span>);
		}

		return <div className="dot-container">{dots}</div>;
	};

	return (
		<div className="image-scroller" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
			<div className="inner-card">
				<div className="image-container">
					<img
						src={images[currentIndex]}
						alt=""
						className="image"
						onMouseEnter={handleMouseEnter}
						onMouseLeave={handleMouseLeave}
					/>
				</div>
				<div className="controls">
					<button className="prev" onClick={handlePrevClick}>◀</button>
					{renderDots()}
					<button className="next" onClick={handleNextClick}>▶</button>
				</div>
			</div>
		</div>
	);
};

export default ImageGallery;