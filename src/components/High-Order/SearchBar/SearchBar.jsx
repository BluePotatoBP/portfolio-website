import "./SearchBar.css";

import React, { useState, useEffect } from "react";
import { getProjects } from "../../../util/ProjectsList/ProjectsList.js";
import { Link } from "react-router-dom"

import { FaSearch, FaHourglassHalf } from "react-icons/fa";
import { ImCross } from "react-icons/im";
import { MdImageNotSupported } from "react-icons/md";

const SearchBar = () => {
    // Requesting the projects list
    const [inputItems, setInputItems] = useState([]);
    useEffect(() => { setInputItems(getProjects()) }, []);
    const hasProjects = Object.keys(inputItems).length > 0;
    // Search hook and logic
    const [searchValue, setSearchValue] = useState("");
    const handleInputChange = (e) => setSearchValue(e.target.value);
    const inputExists = searchValue.length > 0;
    // Clear button
    const handleInputClear = () => setSearchValue("");
    
    // Filtering projects from tags
    let projectList = [];
    const filteredProjects = () => {
        Object.values(inputItems).forEach(project => {
            const projectExists = project.tags.some(tag => tag.toLowerCase().includes(searchValue.toLowerCase()));
            if (projectExists) projectList.push(project);
        });
    }

    // Mapping the projects and returning list items
    const projectListItems = () => projectList.slice(0, 5).map(p => {
        const linkTo = p.name ? "projects/" + p.name : "not-found";
        const decoName = p.decoName ? p.decoName : "Something went wrong...";
        const shortDesc = p.shortDesc ? p.shortDesc : "Something went wrong...";
        const thumbnailSrc = p.thumbnail ? <img alt="" draggable={false} src={p.thumbnail} /> : <MdImageNotSupported className="thumbnail-fallback" />;

        return <li key={decoName + Math.floor(Math.random() * 100)} className="search-item">
            <Link to={linkTo} draggable={false} onClick={handleInputClear}>
                <div className="search-result-thumbnail">{thumbnailSrc}</div>
                <div className="search-result-info">
                    <div className="search-result-name">{decoName}</div>
                    <div className="search-result-desc">{shortDesc}</div>
                </div>
            </Link>
        </li>
    })

    return (
        <div className="search-container">
            <div className="search-bar">
                {hasProjects ? <FaSearch className="search-icon" /> : <FaHourglassHalf className="search-icon-fallback" />}
                <input type="text" placeholder="Search" aria-label="Enter serach term" className="search-input" value={searchValue} onChange={handleInputChange} />

                {inputExists && <button className="search-clear" onClick={handleInputClear}><ImCross /></button>}
                {inputExists && filteredProjects()}
            </div>
            <div className="search-items">
                <ul>
                    {projectListItems()}
                </ul>
            </div>
        </div>
    );
}

export default SearchBar;