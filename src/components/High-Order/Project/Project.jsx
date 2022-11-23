import "./Project.css";
import { useParams } from "react-router-dom";
import { getProject } from "../../../util/ProjectsList/ProjectsList"

import AboutProject from "../AboutProject/AboutProject.jsx"
import ProjectDescription from "../ProjectDescription/ProjectDescription";

import { FaGithubSquare } from 'react-icons/fa';

const Project = () => {
    const { project } = useParams();
    const projectData = getProject(project);
    const GITHUB_URL = "https://github.com/"

    return (
        <div className="project-container">
            <div className="project-top-row">
                <div className="project-top-row-title">
                    <img src={projectData.thumbnail} alt="thumbnail" draggable={false} className="project-thumbnail" />
                    <div className="project-summary">
                        <h2>{projectData.decoName}</h2>
                        <span>{projectData.shortDesc}</span>
                    </div>
                </div>
                <div className="project-summary-icons">
                    <a href={GITHUB_URL + projectData.repo} target="_blank" rel="noreferrer"><FaGithubSquare className="project_summary_icon" /></a>
                </div>
            </div>
            <div className="project-description-row">
                <div className="project-content">
                    <ProjectDescription project={projectData} />
                    <AboutProject project={projectData} />
                </div>
            </div>
        </div>
    );
}

export default Project;