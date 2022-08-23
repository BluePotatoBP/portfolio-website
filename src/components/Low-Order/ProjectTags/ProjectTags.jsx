import React from "react";
import "./ProjectTags.css";

const ProjectTags = ({ tags }) => {
    const mapProjectTags = () => {
        return tags.map((tag, index) => {
            return <div className="project-tag" key={index} title={tag}>{tag}</div>;
        });
    };

    return <div className="project-tags">{mapProjectTags()}</div>;
};

export default ProjectTags;