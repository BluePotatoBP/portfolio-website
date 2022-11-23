import { useState, useEffect, useCallback } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const ProjectDescription = ({ project }) => {

    const [readme, setReadme] = useState(null);
    const hasReadme = readme !== null;

    // Getting data from github api
    const getMarkdownData = useCallback(() => {
        const FETCH_URL = `https://raw.githubusercontent.com/${project.repo}/master/README.md`;

        fetch(FETCH_URL)
            .then(response => {
                if (response.ok)
                    return response.text();
                if (response.status > 300)
                    return null;
                throw response;
            })
            .then(data => {
                setReadme(data)
            })
    }, [project.repo]);

    // Getting data from local storage
    useEffect(() => {
        const data = localStorage.getItem("readme-data-" + project.repo);
        if (data === null) return getMarkdownData();
        if (data) setReadme(data);
    }, [project.repo, getMarkdownData]);

    // Saving data to local storage
    useEffect(() => {
        if (readme === null) return getMarkdownData();
        localStorage.setItem("readme-data-" + project.repo, readme);
    }, [readme, project.repo, getMarkdownData]);

    if (hasReadme) {
        return (
            <div className="project-desc">
                <ReactMarkdown remarkPlugins={[remarkGfm]} skipHtml={true} children={readme} />
            </div>
        );
    } else {
        return (
            <div className="project-desc">
                <h4>It's pretty empty here... 👻</h4>
            </div>
        )
    }
}

export default ProjectDescription;