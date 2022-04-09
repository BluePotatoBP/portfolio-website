import './projects.css';
import { Link, Outlet } from 'react-router-dom';
import { getProjects } from '../../data/Projects';
import { VscGithub } from 'react-icons/vsc';

export default function Projects() {
    const projects = getProjects();

    return (
        <div className="projects">
            <h1>Projects</h1>
            {/* Mapping projects to a clickable list */}
            {projects.map(project => (
                <a href={`${project.url}`}>
                    <VscGithub className="icon" />
                    <Link to={`/projects/${project.name}`} key={`${project.id}`}>{project.styled_name}
                        <br />
                    </Link>
                </a>
            ))}
            <Outlet />
        </div>
    )
}