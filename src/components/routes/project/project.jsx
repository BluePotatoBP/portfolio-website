import { useParams } from "react-router-dom";
import { getProject } from "../../data/Projects";
import { VscGithub } from 'react-icons/vsc';

export default function Project() {
    const { project } = useParams();
    const projectData = getProject(project);

    return (
        <div className="project">
            <h1>{projectData.styled_name}</h1>
            <a href={`${projectData.url}`} target="_blank" rel="noreferrer"><VscGithub className="icon" /></a>
            <h3>{projectData.short_desc}</h3>
        </div>
    )
}