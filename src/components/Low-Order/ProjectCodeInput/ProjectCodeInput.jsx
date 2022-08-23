import { useState } from "react";
import "./ProjectCodeInput.css";

import { BiCopy, BiLinkExternal } from "react-icons/bi";
import { IoCheckmarkCircleOutline } from "react-icons/io5";

// <ProjectCodeInput customLabel="HTML" inputValue={...} copyDate={True} redirectUrl="url">
const ProjectCodeInput = ({ customLabel, inputValue, copyData, redirectUrl }) => {
    // Set state, and get label element
    const [copied, setCopied] = useState(false);
    const labelInputName = customLabel.toLowerCase() + "-input";
    const inputElement = document.getElementsByClassName(labelInputName)[0];
    // Copy data to clipboard
    const copyToClipboard = () => {
        inputElement.select();
        navigator.clipboard.writeText(inputValue);
        setCopied(true);
        setTimeout(() => { setCopied(false) }, 2000);
    };

    return (
        <div className="code-input-container">
            <div className="input-label">{customLabel}</div>
            <div className="input-container">
                <input className={labelInputName} type="text" readOnly={true} aria-label={inputValue} value={inputValue} />
                {
                    copyData ?
                        <button onClick={copyToClipboard} className="input-copy-btn">
                            {copied ? <IoCheckmarkCircleOutline className="input-copied-icon" /> : <BiCopy className="input-copy-icon" />}
                        </button>
                        : null
                }
                {
                    redirectUrl ?
                        <a href={redirectUrl} target="_blank" rel="noreferrer">
                            <BiLinkExternal className="input-redirect" />
                        </a> : null
                }
            </div>
        </div>
    );
};

export default ProjectCodeInput;