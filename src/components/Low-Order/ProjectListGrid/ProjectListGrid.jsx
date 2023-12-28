import "./ProjectListGrid.css";
import { getProjects } from "../../../util/ProjectsList/ProjectsList";
import { useState } from "react";
import { MdExpandMore } from "react-icons/md";
import Card from "../../Low-Order/Card/Card";

const projects = getProjects(true)

// Create card instances
export const listProjects = (amount, onlyFeatured = false) =>
	projects.slice(0, amount).map((p, i) => {
		if (p === null) return null;
		if (onlyFeatured && !p.featured) return null;
		if (p.hidden || p.hidden === null) return null;
		return <Card decoration={p} key={`card-${p.index}-${i}`} />;
	});

const ProjectListGrid = () => {
	const [displayedProjects, setDisplayedProjects] = useState(8);

	// Handle the load more button
	const handleLoadMoreClick = () => {
		setDisplayedProjects(displayedProjects + 4);
	};

	return (
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
	)

}

export default ProjectListGrid