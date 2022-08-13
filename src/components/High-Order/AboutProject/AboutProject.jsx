import { useEffect, useState } from "react";
import "./AboutProject.css"

import ProjectCodeInput from "../../Low-Order/ProjectCodeInput/ProjectCodeInput.jsx"

import { AiFillInfoCircle } from "react-icons/ai";

const AboutProject = ({ project }) => {
    // Request data from github api
    const BASE_URL = "https://api.github.com/repos/bluepotatobp/";
    const [repoData, setRepoData] = useState(null);
    const [responseStatus, setResponseStatus] = useState(null);
    const hasRepoData = repoData !== null;

    // Getting data from github api
    useEffect(() => {
        fetch(BASE_URL + project.repo)
            .then(response => {
                setResponseStatus(response.status);
                if (response.ok)
                    return response.json()
                if (response.status > 300)
                    return null;
                throw response;
            })
            .then(data => setRepoData(data))
            .catch(e => { }) // i know i shouldnt do this shhh
    }, [project.repo]);

    // Getting data from local storage
    useEffect(() => {
        const data = localStorage.getItem("github-data-" + project.repo);
        if (data !== null && JSON.parse(data).name === project.name) setRepoData(JSON.parse(data));
        if (data === null) return;
        if (data) setRepoData(JSON.parse(data));
    }, [project.repo, project.name]);

    // Saving data to local storage
    useEffect(() => {
        if (repoData === null) return;
        localStorage.setItem("github-data-" + project.repo, JSON.stringify(repoData));
    }, [repoData, project.repo]);

    const mapProjectTags = () => {
        return project.tags.map((tag, index) => {
            return (<div className="about-project-tag" key={index}>{tag}</div>)
        })
    }

    if (hasRepoData) {
        const creationDate = new Date(repoData.created_at).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
        const zipDownloadURL = `https://github.com/${repoData.owner.login}/${repoData.name}/archive/refs/heads/master.zip`;

        return (
            <div className="about-project">
                <div className="about-project-top">
                    <div className="about-project-title">
                        <h2>About Project</h2>
                    </div>
                    <div className="about-project-top-content">
                        <div className="about-project-item">Stars: {repoData.stargazers_count}</div>
                        <div className="about-project-item">Watching: {repoData.watchers_count}</div>
                        <div className="about-project-item">Forks: {repoData.forks_count}</div>
                        <div className="about-project-item">Open Issues: {repoData.open_issues_count}</div>
                        <div className="about-project-item">Language: {repoData.language}</div>
                        <div className="about-project-item">Created: {creationDate}</div>
                    </div>
                </div>
                <div className="about-project-middle">
                    <div className="about-project-middle-content">
                        <h2>Tags</h2>
                        <div className="about-project-tags">{mapProjectTags()}</div>
                    </div>
                </div>
                <div className="about-project-bottom">
                    <div className="about-project-bottom-content">
                        <h2>Code</h2>
                        <ProjectCodeInput customLabel={"HTTPS"} inputValue={repoData.clone_url} copyData={true} />
                        <ProjectCodeInput customLabel={"SSH"} inputValue={repoData.ssh_url} copyData={true} />
                        <ProjectCodeInput customLabel={"ZIP"} inputValue={zipDownloadURL} redirectUrl={zipDownloadURL} />
                        <h2>License</h2>
                        <div>{repoData.license ? repoData.license : "MIT"}</div>
                    </div>
                </div>
            </div>
        )
    } else {
        if (responseStatus === 404 || responseStatus === 403) {
            return (
                <div className="about-project">
                    <div className="about-project-error">
                        <h3 title="test">ERROR</h3>
                        <div className="about-project-error-status">
                            <AiFillInfoCircle title={`The ${responseStatus} error usually indicates that the item is missing, either it doesn't exist, it couldn't be found or it's access is forbidden.`} className="about-project-error-icon" />
                            <h6>404</h6>
                        </div>
                    </div>
                </div>
            )
        } else if (responseStatus === 301) {
            return (
                <div className="about-project">
                    <div className="about-project-error">
                        <h3>Repo Moved 🤷‍♀️</h3>
                        <div className="about-project-error-status">
                            <AiFillInfoCircle title="The 301 error usually indicates that the repo moved." className="about-project-error-icon" />
                            <h6>403</h6>
                        </div>
                    </div>
                </div>
            )
        } else {
            return (
                <div className="about-project">
                    <div className="about-project-loading">
                        <AiFillInfoCircle title="Still loading? Please contact the developer!" className="about-project-loading-stuck-icon" />
                        <h3>LOADING</h3>
                    </div>
                </div>
            )
        }
    }

};

export default AboutProject;