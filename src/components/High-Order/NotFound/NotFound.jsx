import "./NotFound.css";

const NotFound = () => {

	const titles = ["Not Found.", "404 Not Found.", "Couldn't find that page.", "Sorry, that page doesn't exist."]
	const descriptions = ["Maybe the page got moved.", "Couldn't find that page.", "This page doesnt exist."]

	const randomTitle = Math.floor(Math.random() * titles.length)
	const randomDescription = Math.floor(Math.random() * descriptions.length)


	return (
		<div className="not-found-container">
			<div className="not-found-content">
				<div className="not-found-title">{titles[randomTitle]}</div>
				<div className="not-found-description">{descriptions[randomDescription]}</div>
			</div>
		</div>
	);
}

export default NotFound