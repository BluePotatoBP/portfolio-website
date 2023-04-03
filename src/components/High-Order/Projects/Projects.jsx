import "./Projects.css";
import { useState } from "react";
import { getProjects } from "../../../util/ProjectsList/ProjectsList";
import { MdExpandMore } from "react-icons/md";
import HighlightedText from "../../Low-Order/HighlightedText/HighlightedText";
import Card from "../../Low-Order/Card/Card";
import ImageGallery from "../../Low-Order/ImageGallery/ImageGallery";

const PFP = process.env.PUBLIC_URL + "pfp.png";
const LAL_LOGO = "lalLogo512.png";
const PORTFOLIO_LOGO = process.env.PUBLIC_URL + "/logo512.png"
const imagesList = [PFP, LAL_LOGO, PORTFOLIO_LOGO];

const Projects = () => {
	// Getting the projects
	const projects = Object.values(getProjects()).filter((p) => {
		if (p.hidden) return null;
		return p;
	});

	// State variable to keep track of the number of displayed projects
	const [displayedProjects, setDisplayedProjects] = useState(8);

	// Function to return the current list of projects
	const listProjects = (amount, onlyFeatured = false) =>
		projects.slice(0, amount).map((p, i) => {
			if (p === null) return null;
			if (onlyFeatured && !p.featured) return null;
			if (p.hidden || p.hidden === null) return null;
			return <Card decoration={p} key={`card-${p.index}-${i}`} />;
		});

	// Function to handle the load more button click
	const handleLoadMoreClick = () => {
		setDisplayedProjects(displayedProjects + 4);
	};

	return (
		<div className="projects-container" style={{ backgroundImage: `url(${process.env.PUBLIC_URL + "./bgPattern.png"})` }}>
			<div className="projects-main-display">
				<div className="featured-list">
					<div className="title-large featured">Featured Projects</div>
					<div className="featured-list-items">{listProjects(3, true)}</div>
				</div>
				<div className="block-paragraph bottom">
					<span className="bottom-paragraph-text">
						<HighlightedText text={"Like A Light"} image={LAL_LOGO} />
						is actually how I got into NodeJS and Discord bots, but it wasn't
						always called that. Instead, it started out as "Assistant" and was
						made for personal use to help me with reminders. After about three
						years of development, I decided to take a break and work on some
						other projects, such as this
						<HighlightedText text={"Portfolio Website"} image={PORTFOLIO_LOGO} />
						and
						<HighlightedText text={"VOID"} />
						which is a Discord drawing game that requires team effort and dedication to
						complete. Each "turn" you place one pixel on the board to help
						your faction (or quadrant) win the contest and earn prizes within the game economy!
					</span>
					<ImageGallery images={imagesList} />
				</div>
				<div className="projects-list">
					<h1 className="title-large">All Projects</h1>
					<div className="projects-list-items">
						{listProjects(displayedProjects)}
					</div>
					{displayedProjects < projects.length && (
						<button className="load-more-btn" title="Press to load more projects." onClick={handleLoadMoreClick}>
							<MdExpandMore />
						</button>
					)}
				</div>
			</div>
		</div>
	);
};

export default Projects;
