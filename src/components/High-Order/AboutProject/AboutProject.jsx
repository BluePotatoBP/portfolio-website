import "./AboutProject.css"
import { useEffect, useState } from "react";

import ProjectCodeInput from "../../Low-Order/ProjectCodeInput/ProjectCodeInput.jsx"
import Timestamp from "../../Low-Order/Timestamp/Timestamp";
import ProjectLanguage from "../../Low-Order/ProjectLanguage/ProjectLanguage";
import ProjectTags from "../../Low-Order/ProjectTags/ProjectTags";

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

    if (hasRepoData) {
        const zipDownloadURL = `https://github.com/${repoData.owner.login}/${repoData.name}/archive/refs/heads/master.zip`;

        return (
            <div className="about-project">
                <div className="about-project-top">
                    <h2>About Project</h2>
                    <div className="about-project-top-content">
                        <div className="about-project-item">
                            <div>Stars:</div>
                            <div className="item-data">{repoData.stargazers_count}</div>
                        </div>
                        <div className="about-project-item">
                            <div>Watching:</div>
                            <div className="item-data">{repoData.watchers_count}</div>
                        </div>
                        <div className="about-project-item">
                            <div>Forks:</div>
                            <div className="item-data">{repoData.forks_count}</div>
                        </div>
                        <div className="about-project-item">
                            <div>Language:</div>
                            <ProjectLanguage language={repoData.language} />
                        </div>
                        <div className="about-project-item">
                            <div>Created:</div>
                            <Timestamp timestamp={repoData.created_at} />
                        </div>
                    </div>
                </div>
                <div className="about-project-middle">
                    <h2>Code</h2>
                    <ProjectCodeInput customLabel={"HTTPS"} inputValue={repoData.clone_url} copyData={true} />
                    <ProjectCodeInput customLabel={"SSH"} inputValue={repoData.ssh_url} copyData={true} />
                    <ProjectCodeInput customLabel={"ZIP"} inputValue={zipDownloadURL} redirectUrl={zipDownloadURL} />
                </div>
                <div className="about-project-bottom">
                    <div className="about-project-bottom-content">
                        <div className="about-project-middle-content">
                            <div className="project-tags-container">
                                <h2>Tags</h2>
                                <AiFillInfoCircle title={`Tags can be used to search for projects.`} className="project-tags-icon" />
                            </div>
                            <ProjectTags tags={project.tags} />
                        </div>
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
                        <div title="test">COULDNT LOAD INFO</div>
                        <div className="about-project-error-content">
                            <AiFillInfoCircle title={`The ${responseStatus} error means the repo is missing, either it doesn't exist, it couldn't be found or access to it is forbidden.`} className="about-project-error-icon" />
                            <h6>404</h6>
                        </div>
                        <div className="skeleton-text normal" />
                        <div className="skeleton-text short-right" />
                        <div className="skeleton-text short-left" />
                    </div>
                </div>
            )
        } else if (responseStatus === 301) {
            return (
                <div className="about-project">
                    <div className="about-project-error">
                        <div>REPO MOVED 🤷‍♀️</div>
                        <div className="about-project-error-content">
                            <AiFillInfoCircle title="The 301 error usually means the repo moved." className="about-project-error-icon" />
                            <h6>403</h6>
                        </div>
                        <div className="skeleton-text normal" />
                        <div className="skeleton-text short-right" />
                        <div className="skeleton-text short-left" />
                    </div>
                </div>
            )
        } else {
            return (
                <div className="about-project">
                    <div className="about-project-loading">
                        <AiFillInfoCircle title="Still loading? Please contact the developer!" className="about-project-loading-stuck-icon" />
                        <div>LOADING</div>
                    </div>
                    <div className="project-loading-skeleton">
                        <div className="skeleton-text normal" />
                        <div className="skeleton-text short-right" />
                        <div className="skeleton-text short-left" />
                    </div>
                </div>
            )
        }
    }

};

export default AboutProject;