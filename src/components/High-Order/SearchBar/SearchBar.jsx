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

    // Search state and logic
    const [searchValue, setSearchValue] = useState("");
    const handleInputChange = (e) => setSearchValue(e.target.value);
    const inputExists = searchValue.length > 0;

    // Clear button
    const handleInputClear = () => setSearchValue("");

    // Is focused state
    const [focused, setFocused] = useState("");
    useEffect(() => { setFocused(false) }, []);

    // Getting search input element
    const searchInput = document.getElementsByClassName("search-input")[0];
    const searchItems = document.getElementsByClassName("search-items")[0];

    // Change search-input outline color on focus
    const handleInputFocus = () => {
        searchInput.placeholder = "";
        searchInput.style.outlineColor = "#A3EBB1"
        setFocused(true);
    };

    // Change search-input outline color on lost focus
    const handleBlur = () => {
        setTimeout(() => {
            searchInput.placeholder = "Search";
            searchInput.style.outlineColor = "#e0e0e0";
            searchItems.style.padding = "0";

            setFocused(false);
        }, 100)
    };

    // Search shortcut
    useEffect(() => {
        const callback = (event) => {
            if ((event.metaKey || event.ctrlKey) && event.code === 'KeyK') {
                event.preventDefault();
                focused ? searchInput.blur() : searchInput.focus();
            }
        };

        document.addEventListener('keydown', callback);
        return () => document.removeEventListener('keydown', callback);
    }, [focused, searchInput]);

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

        return <li key={"item" + projectList.indexOf(p)}>
            <div className="search-item">
                <Link to={linkTo} draggable={false} onClick={handleInputClear} key={"item" + projectList.indexOf(p)}>
                    <div className="search-result-thumbnail">{thumbnailSrc}</div>
                    <div className="search-result-info">
                        <div className="result-clickable">
                            <div className="search-result-name">{decoName}</div>
                            <div className="search-result-desc">{shortDesc}</div>
                        </div>
                    </div>
                </Link>
            </div>
            <div className="bottom-line" key={"divider" + projectList.indexOf(p)}></div>
        </li>
    })

    return (
        <div className="search-container">
            <div className="search-bar">
                {hasProjects ? <FaSearch className="search-icon" /> : <FaHourglassHalf className="search-icon-fallback" />}
                <input type="text" placeholder="Search" aria-label="Enter serach term" className="search-input" value={searchValue} onChange={handleInputChange} onBlur={handleBlur} onFocus={handleInputFocus} />

                {inputExists && <button className="search-clear" onClick={handleInputClear}><ImCross /></button>}
                {inputExists && filteredProjects()}
            </div>
            <div className="search-items">
                {focused ? <ul>{projectListItems()}</ul> : null}
            </div>
        </div>
    );
}

export default SearchBar;