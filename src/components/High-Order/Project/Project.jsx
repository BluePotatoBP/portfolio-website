import "./Project.css";
import { useParams } from "react-router-dom";
import { getProject } from "../../../util/ProjectsList/ProjectsList"

import AboutProject from "../AboutProject/AboutProject.jsx"
import ProjectDescription from "../ProjectDescription/ProjectDescription";

import { FaGithubSquare } from 'react-icons/fa';
import { MdImageNotSupported } from "react-icons/md";

const Project = () => {
    const { project } = useParams();
    const projectData = getProject(project);

    const githubUrl = `https://github.com/${projectData.repo}`

    return (
        <div className="project-container">
            <div className="project-top-row">
                <div className="project-top-row-title">
                    {projectData.thumbnail ? <img src={process.env.PUBLIC_URL + `/${projectData.thumbnail}`} onLoad={(e) => { e.target.src = process.env.PUBLIC_URL + `/${projectData.thumbnail}`}} alt="thumbnail" draggable={false} className="project-thumbnail" /> : <MdImageNotSupported className="project-thumbnail fallback" />}
                    <div className="project-summary">
                        <h2>{projectData.decoName}</h2>
                        <span>{projectData.shortDesc}</span>
                    </div>
                </div>
                <div className="project-summary-icons">
                    <a href={githubUrl} target="_blank" rel="noreferrer"><FaGithubSquare className="project_summary_icon" /></a>
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