import "./CtaBtn.css"

import React from "react";
import { useNavigate } from 'react-router-dom';

const CtaBtn = ({ btnStyle, dest }) => {
    // Predefine button enums
    const btnContent = {
        'HOME': "Homepage",
        'ABOUT': "About",
        'PROJECTS': "Projects",
        'CONTACT': "Contact me",
    }

    // Handle the button being disabled
    function handleDisabledState() {
        return btnStyle === "DISABLED" ? true : false;
    }

    // Handle the button being clicked
    let navigate = useNavigate();
    function handleClick() {
        navigate(dest.toLowerCase());
    }

    // Return component
    return (
        <div className="cta-button-container">
            <button className="cta-btn" onClick={handleClick} disabled={handleDisabledState()} btnstyle={btnStyle}>{btnContent[dest]}</button>
        </div>
    )
}

export default CtaBtn;