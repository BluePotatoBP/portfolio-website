import React, { useState, useEffect, useRef, useCallback } from "react";
import "./ImageGallery.css";
import Slide from "../../Low-Order/Slide/Slide";
import Dot from "../../Low-Order/Dot/Dot";

const ImageGallery = ({ images = 0, autoplaySpeed = 4000, maxDots = 5 }) => {
	const [currentIndex, setCurrentIndex] = useState(0);
	const [isAutoPlaying, setIsAutoPlaying] = useState(true);
	const [imagesLoaded, setImagesLoaded] = useState(false);

	const intervalRef = useRef(null);

	const stopAutoplay = useCallback(() => {
		clearInterval(intervalRef.current);
	}, []);
	// Previous click detection
	const handlePrevClick = () => {
		const newIndex = currentIndex === 0 ? images.length - 1 : currentIndex - 1;
		setCurrentIndex(newIndex);
		stopAutoplay();
	};
	// Next click detection
	const handleNextClick = () => {
		const newIndex = currentIndex === images.length - 1 ? 0 : currentIndex + 1;
		setCurrentIndex(newIndex);
		stopAutoplay();
	};
	// Per image selection
	const handleDotClick = (index) => {
		setCurrentIndex(index);
		stopAutoplay();
	};
	// When the mouse hovers over, the playback should stop
	const handleMouseEnter = useCallback(() => {
		setIsAutoPlaying(false);
		stopAutoplay();
	}, [setIsAutoPlaying, stopAutoplay]);
	// Playback should continue when the mouse is off the bounding box
	const handleMouseLeave = useCallback(() => {
		setIsAutoPlaying(true);
	}, [setIsAutoPlaying]);

	// Autoplay for images
	useEffect(() => {
		const preloadImage = (url) => {
			return new Promise((resolve, reject) => {
				const img = new Image();
				img.onload = () => resolve(img);
				img.onerror = reject;
				img.src = url;
			});
		};
		// Preload images so they are ready for display when scrolled to
		const preloadImages = async (imageUrls) => {
			try {
				const preloadPromises = imageUrls.map(preloadImage);
				await Promise.all(preloadPromises);
				setImagesLoaded(true); // Set imagesLoaded to true
			} catch (error) {
				console.error("Error preloading images:", error);
			}
		};
		// Update current index
		const changeImage = () => {
			const newIndex = currentIndex === images.length - 1 ? 0 : currentIndex + 1;
			setCurrentIndex(newIndex);
		};
		// Switch images
		const startAutoplay = () => {
			if (images.length <= 1 || !isAutoPlaying) return;
			intervalRef.current = setInterval(() => {
				changeImage();
			}, autoplaySpeed);
		};
		preloadImages(images);
		startAutoplay();
		return () => stopAutoplay();
	}, [autoplaySpeed, images.length, currentIndex, isAutoPlaying, stopAutoplay, images]);

	// Display control dots dynamically based on the number of images
	const renderDots = () => {
		if (images.length <= 1) return null;

		if (!isAutoPlaying) {
			return (
				<div className="pause-icon" onClick={handleMouseLeave} title="Autoplay has been paused. It will resume once the cursor has been lifted off the image." aria-label="paused">
					&#10074;&#10074;
				</div>
			)
		} else {
			const maxDotsToShow = Math.min(maxDots, images.length);
			let dots = [];

			// Add dots
			for (let i = 0; i < maxDotsToShow; i++) {
				dots.push(<Dot key={i} active={i === currentIndex} onClick={() => handleDotClick(i)} />);
			}

			// If theres more images than max allowed dots, add overflow dots
			if (images.length > maxDotsToShow) {
				dots.push(<span key={maxDotsToShow} className={`dot overflow ${currentIndex >= maxDots ? "active" : ""}`}>∙</span>);
				dots.unshift(<span key={maxDotsToShow + 1} className={`dot overflow ${currentIndex >= maxDots ? "active" : ""}`}>∙</span>);
			}

			return <div className="dot-container">{dots}</div>;
		}
	};

	return (
		<div className="image-carousel" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
			<div className="inner-card">
				{imagesLoaded ? ( // Render the gallery if images are loaded
					<>
						<div className="slides-container" style={{ transform: `translateX(${-currentIndex * 100}%)`, transitionDuration: "0.8s" }}>
							{images.map((image, index) => (<Slide key={index} image={image} active={index === currentIndex} />))}
						</div>
						<div className="controls">
							<button className="control-btn prev" onClick={handlePrevClick} aria-label="previous">◀</button>
							{renderDots()}
							<button className="control-btn next" onClick={handleNextClick} aria-label="next">▶</button>
						</div>
					</>
				) : (
					<div className="loading-spinner">LOADING</div> // Show loading spinner if images are not loaded
				)}
			</div>
		</div>
	);

};

export default ImageGallery;