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
const VOID_LOGO = process.env.PUBLIC_URL + "/voidLogo.png"
const imagesList = [PFP, LAL_LOGO, PORTFOLIO_LOGO, VOID_LOGO];

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
					<div className="title-text">Some of the projects I had tons of fun working on!</div>
					<div className="featured-list-items">{listProjects(3, true)}</div>
					<div className="slope-shape-divider">
						<svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
							<path d="M1200 120L0 16.48 0 0 1200 0 1200 120z" className="shape-fill"></path>
						</svg>
					</div>
				</div>
				<div className="content-paragraph">
					<div className="content-container">
						<div className="paragraph-title">ACTUALLY...</div>
						<span className="bottom-paragraph-text">
							<HighlightedText text={"Like A Light"} image={LAL_LOGO} />
							is how I got into NodeJS and Discord bots, but it wasn't
							always called that. Instead, it started out as "Assistant" and was
							made for personal use to help me with reminders. After about three
							years of development, I decided to take a break and work on some
							other projects, such as
							<HighlightedText text={"Portfolio Website"} image={PORTFOLIO_LOGO} />
							and
							<HighlightedText text={"VOID"} image={VOID_LOGO} />
						</span>
					</div>
					<ImageGallery images={imagesList} />
					<div className="curve-shape-divider-bottom">
						<svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
							<path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" opacity=".25" className="shape-fill"></path>
							<path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" opacity=".5" className="shape-fill"></path>
							<path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" className="shape-fill"></path>
						</svg>
					</div>
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
