import "./SearchBar.css";

import React, { useState, useEffect, useMemo } from "react";
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

    // Search state
    const [searchValue, setSearchValue] = useState("");
    const handleInputChange = (e) => setSearchValue(e.target.value);
    const inputExists = searchValue.length > 0;

    // Clear button
    const handleInputClear = () => setSearchValue("");

    // Filtering projects from tags/name and memoizing the result
    const projectList = useMemo(() => {
        // If theres no input return an empty array
        if (!inputExists) return [];
        // Otherwise filter the projects
        const inputArray = Object.values(inputItems);
        const filteredProjects = inputArray.filter((project) => {
            // Formatting inputs
            const projectNameFormatted = project.decoName.toLowerCase().split(" ").join("");
            const searchValueFormatted = searchValue.toLowerCase().split(" ").join("");
            if (searchValueFormatted === "") return false;
            // Filtering by name
            if (!project.hidden && projectNameFormatted.includes(searchValueFormatted)) return true;
            // Filtering by tags
            for (let i = 0; i < project.tags.length; i++) {
                if (project.tags[i].toLowerCase().includes(searchValueFormatted)) return true;
            }
            // If no match return false
            return false;
        });

        return filteredProjects;
    }, [inputExists, inputItems, searchValue]);

    // Focus state
    const [focused, setFocused] = useState(false);
    const handleFocus = () => setFocused(true);
    const handleBlur = () => {
        setTimeout(() => {
            setFocused(false)
        }, 100)
    };

    // Getting elements for later use
    const searchInput = document.getElementsByClassName("search-input")[0];
    const searchItems = document.getElementsByClassName("search-items")[0];

    // Change appearance of search bar based on focus
    useEffect(() => {
        const noProjectsElement = document.getElementsByClassName("no-projects")[0];
        const noShortcutTipElement = document.getElementsByClassName("shortcut-tip")[0];
        const noKeybindsElement = document.getElementsByClassName("keybinds-tip")[0];
        const noSearchFooter = document.getElementsByClassName("search-footer")[0];

        if (focused) {
            // If focused, change the placeholder and border color
            searchInput.style.outlineColor = "#A3EBB1"
            searchInput.style.fontWeight = "300";

            // If parent element exists and the input is empty change padding to 0
            if (searchItems && inputExists) searchItems.style.padding = "0.75rem 0";
            else searchItems.style.padding = "0";

            // Adding a footer with tips
            if (inputExists && !noShortcutTipElement && projectList.length > 0) {
                const userAgent = window.navigator.userAgent;
                let OS;
                if (userAgent.includes("Windows")) OS = "Windows";
                else if (userAgent.includes("Mac")) OS = "MacOS";
                else if (userAgent.includes("Linux")) OS = "Linux"
                else OS = "Windows";

                const actionKey = {
                    "Windows": "Ctrl",
                    "MacOS": "⌘",
                    "Linux": "Ctrl"
                };

                const searchFooter = document.createElement("div");
                searchFooter.className = "search-footer";
                searchItems.appendChild(searchFooter);

                const shortcutTip = document.createElement("div");
                shortcutTip.className = "shortcut-tip";
                shortcutTip.innerHTML = `<div class="highlight-code">${actionKey[OS]}+K</div> to toggle focus.`; // yes yes i know this is bad
                searchFooter.appendChild(shortcutTip);

                const keybindsTip = document.createElement("div");
                keybindsTip.className = "keybinds-tip";
                keybindsTip.innerHTML = `Keybinds <div class="highlight-code">${actionKey[OS]}+I</div>`;
                searchFooter.appendChild(keybindsTip);

            } else if (!inputExists || projectList.length === 0) {
                if (noSearchFooter) searchItems.removeChild(noSearchFooter);
                if (noShortcutTipElement) noSearchFooter.removeChild(noShortcutTipElement);
                if (noKeybindsElement) noSearchFooter.removeChild(noKeybindsElement);
            }

            // Show a message if there are no projects found
            if (inputExists && projectList.length === 0 && !noProjectsElement) {
                const noProjects = document.createElement("div");
                noProjects.className = "no-projects";
                noProjects.innerHTML = "Couldn't find that project.";
                searchItems.appendChild(noProjects);
            } else if (projectList.length === 0) {
                const noProjectsElementChild = document.getElementsByClassName("no-projects")[1];
                if (noProjectsElementChild) searchItems.removeChild(noProjectsElementChild);
            }

            // If theres no input and no projects remove "error" message
            if (searchValue === "" || searchValue === " " || projectList.length > 0) {
                if (noProjectsElement) searchItems.removeChild(noProjectsElement);
            }

        } else if (searchInput) {
            // If not focused, remove tips from footer
            if (noSearchFooter) searchItems.removeChild(noSearchFooter);
            if (noShortcutTipElement) noSearchFooter.removeChild(noShortcutTipElement);
            if (noKeybindsElement) noSearchFooter.removeChild(noKeybindsElement);

            // Change styling back to normal
            if (!inputExists) searchInput.style.fontWeight = "600";
            searchInput.placeholder = "Search";
            searchInput.style.outlineColor = "#e0e0e0";
            searchItems.style.padding = "0";
            if (noProjectsElement) searchItems.removeChild(noProjectsElement);
        }
    }, [searchInput, focused, searchValue, searchItems, projectList, inputExists]);

    // Search shortcut (Ctrl + K)
    // There is a way to make this cross compatible with other keyboard layouts, but I dont think its necessary for my page
    // https://developer.mozilla.org/en-US/docs/Web/API/Keyboard/getLayoutMap
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
                <input type="text" placeholder="Search" aria-label="Enter serach term" className="search-input" value={searchValue} onChange={handleInputChange} onBlur={handleBlur} onFocus={handleFocus} />
                {inputExists && <button className="search-clear" onClick={handleInputClear}><ImCross /></button>}
            </div>
            <div className="search-items">
                {focused ? <ul>{projectListItems()}</ul> : null}
            </div>
        </div>
    );
}

export default SearchBar;