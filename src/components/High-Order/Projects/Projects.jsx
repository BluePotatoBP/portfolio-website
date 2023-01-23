import "./Projects.css";
import { useState } from "react";
import { getProjects } from "../../../util/ProjectsList/ProjectsList";
import Card from "../../Low-Order/Card/Card";

import { MdExpandMore } from "react-icons/md";

const Projects = () => {
    // Getting the projects
    const projects = Object.values(getProjects());

    // State variable to keep track of the number of displayed projects
    const [displayedProjects, setDisplayedProjects] = useState(8);

    // Function to return the current list of projects
    const listProjects = (amount, onlyFeatured = false) =>
        projects.slice(0, amount).map(p => {
            if (onlyFeatured && !p.featured) return null;
            if (p.hidden) return null;
            return <Card decoration={p} key={p.index} />;
        });

    // Function to handle the load more button click
    const handleLoadMoreClick = () => {
        setDisplayedProjects(displayedProjects + 4);
    };

    return (
        <div className="projects-container" >
            <div className="projects-main-display">
                <div className="block-paragraph right">
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laborum doloribus et adipisci iure, minima recusandae nisi aperiam odio voluptas rem, asperiores libero expedita exercitationem, sint aliquid perferendis. Velit nostrum omnis mollitia nesciunt, neque ullam placeat.</p>
                </div>
                <div className="featured-list" >
                    <div className="title-large featured">Featured</div>
                    <div className="featured-list-items" >
                        {listProjects(3, true)}
                    </div>
                </div>
                <div className="block-paragraph left">
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus asperiores culpa porro voluptatibus! Aliquid, maxime? Cumque blanditiis nam officia esse.</p>
                    <p>Lorem ipsum sit amet consectetur elit. Possimus asperiores culpa porro voluptatibus!</p>
                </div>
                <div className="projects-list">
                    <h1 className="title-large">All Projects</h1>
                    <div className="projects-list-items" >
                        {listProjects(displayedProjects)}
                    </div>
                    {displayedProjects < projects.length && (<button className="load-more-btn" title="Press to load more projects." onClick={handleLoadMoreClick} ><MdExpandMore /></button>)}
                </div>
            </div>
        </div>
    );
};

export default Projects;